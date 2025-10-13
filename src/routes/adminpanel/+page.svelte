<script lang="ts">
  import { onMount, tick } from 'svelte';

  // Komponentenheter
  import BlockEditor from '$lib/components/jensComps/adminpanel/BlockEditor.svelte';
  import SectionManager from '$lib/components/jensComps/adminpanel/SectionManager.svelte';
  import BlockTypeSelector from '$lib/components/jensComps/adminpanel/BlockTypeSelector.svelte';
  import BlockImporter from '$lib/components/jensComps/adminpanel/BlockImporter.svelte';
  import PreviewHeader from '$lib/components/jensComps/adminpanel/PreviewHeader.svelte';
  import PreviewSection from '$lib/components/jensComps/adminpanel/PreviewSection.svelte';

  // Funksjoner
  import {
    addBlockToSection, editBlock as getBlockForEdit, deleteBlockFromSection,
    moveBlockUp, moveBlockDown, duplicateBlock, resetBlockState, insertMarkup
  } from '$lib/utils/editor/blocks';
  import {
    addSection, deleteSection, renameSection, moveSectionUp,
    moveSectionDown, normalizeSectionIds
  } from '$lib/utils/editor/sections';
  import {
    resetEditorState, parseSectionText, copyToClipboard,
    importBlock as getImportedBlock
  } from '$lib/utils/editor/editorUtils';
  import { loadSectionsFromStorage, saveSectionsToStorage, formatSections } from '$lib/utils/editor/state';
  import { createHistory, type HistoryState } from '$lib/utils/editor/history';

  import type { Block, Section } from '$lib/utils/editor/types';

  // --- Konstanter og tilstand ---

  // --- UI-tilstand ---
  let showControls = true;
  let showEditorPopup = false;
  let textareaRef: HTMLTextAreaElement;
  let pastedContent = '';

  const EMPTY_PARAGRAPH: Block = { type: 'paragraph', text: '' };
  let blockType: Block['type'] = 'paragraph';
  let currentBlock: Block = { ...EMPTY_PARAGRAPH };

  let editingIndex: number | null = null;
  let editingSectionIndex: number | null = null;
  let currentSectionIndex = 0;

  let importFromSection = 0;
  let importFromBlock = 0;

  let history: HistoryState<Section[]> = createHistory([]);
  let sections = history.present;
  let raw = '';


  // --- Init ---
  onMount(() => {
    const initialSections = loadSectionsFromStorage();
    history = createHistory(initialSections);
    sections = history.present;
    raw = formatSections(sections);
  });

  function updateRaw(saveHistory = true) {
    if (saveHistory) {
      history = {
        ...history,
        past: [...history.past, history.present],
        present: sections,
        future: []
      };
    }
    raw = formatSections(sections);
    saveSectionsToStorage(sections);
  }

  // --- Undo/Redo ---
  function undo() {
    if (!history.past.length) return;
    const prev = history.past[history.past.length - 1];
    history = {
      past: history.past.slice(0, -1),
      present: prev,
      future: [history.present, ...history.future]
    };
    sections = history.present;
    updateRaw(false);
  }

  function redo() {
    if (!history.future.length) return;
    const next = history.future[0];
    history = {
      past: [...history.past, history.present],
      present: next,
      future: history.future.slice(1)
    };
    sections = history.present;
    updateRaw(false);
  }

  // --- Seksjonsfunksjoner ---
  function handleAddSection() {
    sections = normalizeSectionIds(addSection(sections));
    currentSectionIndex = sections.length - 1;
    updateRaw();
  }

  function handleRenameSection(index: number, newTitle: string) {
    sections = renameSection(sections, index, newTitle);
    updateRaw();
  }

  function handleDeleteSection(index: number) {
    if (sections.length <= 1) return alert("Du kan ikke slette siste seksjon.");
    if (editingSectionIndex === index) editingIndex = editingSectionIndex = null;
    sections = normalizeSectionIds(deleteSection(sections, index));
    currentSectionIndex = Math.max(0, currentSectionIndex - (currentSectionIndex > index ? 1 : 0));
    updateRaw();
  }

  function handleMoveSectionUp(index: number) {
    sections = normalizeSectionIds(moveSectionUp(sections, index));
    updateRaw();
  }

  function handleMoveSectionDown(index: number) {
    sections = normalizeSectionIds(moveSectionDown(sections, index));
    updateRaw();
  }

  function selectSection(index: number) {
    currentSectionIndex = index;
    editingIndex = editingSectionIndex = null;
  }

  // --- Blokkfunksjoner ---
  function addBlock() {
    sections = addBlockToSection(sections, currentSectionIndex, currentBlock, editingIndex);
    editingIndex = editingSectionIndex = null;
    updateRaw();
    resetBlock();
  }

  function editBlock(sectionIndex: number, blockIndex: number) {
    const block = getBlockForEdit(sections, sectionIndex, blockIndex);
    currentBlock = { ...block };
    blockType = block.type;
    editingIndex = blockIndex;
    editingSectionIndex = sectionIndex;
    currentSectionIndex = sectionIndex;
  }

  function deleteBlock(sectionIndex: number, blockIndex: number) {
    sections = deleteBlockFromSection(sections, sectionIndex, blockIndex);
    if (editingIndex === blockIndex && editingSectionIndex === sectionIndex) {
      editingIndex = editingSectionIndex = null;
    }
    updateRaw();
  }

  function duplicateBlockHandler(sectionIndex: number, blockIndex: number) {
    sections = duplicateBlock(sections, sectionIndex, blockIndex);
    updateRaw();
  }

  function moveBlockUpHandler(sectionIndex: number, blockIndex: number) {
    sections = moveBlockUp(sections, sectionIndex, blockIndex);
    updateRaw();
  }

  function moveBlockDownHandler(sectionIndex: number, blockIndex: number) {
    sections = moveBlockDown(sections, sectionIndex, blockIndex);
    updateRaw();
  }

  function resetBlock() {
    currentBlock = resetBlockState(blockType);
  }

  function insertMarkupWrapper(start: string, end: string) {
    insertMarkup(currentBlock, textareaRef, start, end);
  }

  // --- Import, parsing, reset ---
  function importBlock() {
    const block = getImportedBlock(sections, importFromSection, importFromBlock);
    if (!block) return;
    blockType = block.type;
    currentBlock = block;
    editingIndex = editingSectionIndex = null;
  }

  function resetEditor() {
    sections = resetEditorState();
    currentSectionIndex = 0;
    updateRaw();
  }

  function parsePastedContent() {
    const parsed = parseSectionText(pastedContent);
    if (parsed) {
      sections = parsed;
      currentSectionIndex = 0;
      updateRaw();
    } else {
      alert("Feil ved parsing – sjekk strukturen.");
    }
  }

  function copyJSON() {
    copyToClipboard(raw);
  }

  // --- UI-funksjoner ---
  function handleOpenPopup() {
    showEditorPopup = true;
  }

  function handleClosePopup() {
    showEditorPopup = false;
  }

  function handleToggleControls() {
    showControls = !showControls;
  }

  $: canUndo = history.past.length > 0;
  $: canRedo = history.future.length > 0;

</script>




  <div class="flex flex-col lg:flex-row gap-8 p-6 text-white bg-slate-900 min-h-screen">
    <!-- Editor -->
    <div class="lg:w-1/2 space-y-6">
      <h1 class="text-3xl font-bold text-fuchsia-300">🛠 Admin Editor</h1>
      <SectionManager
        bind:sections
        bind:currentSectionIndex
        renameSection={handleRenameSection}
        selectSection={selectSection}
        addSection={handleAddSection}
        deleteSection={handleDeleteSection}
        undo={undo}
        redo={redo}
        moveSectionUp={handleMoveSectionUp}
        moveSectionDown={handleMoveSectionDown}
        {canUndo}
        {canRedo}
      />





      <BlockTypeSelector {blockType} setBlockType={(type) => { blockType = type; resetBlock(); }} />

      <div class="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-2 shadow">
        <BlockEditor
          bind:blockType
          bind:currentBlock
          insertMarkup={insertMarkupWrapper}
          bind:textareaRef
          {editingIndex}
          onSubmit={addBlock}
        />

      </div>

      <BlockImporter
        {sections}
        bind:importFromSection
        bind:importFromBlock
        onImport={importBlock}
      />

      <div class="space-y-2">
        <button on:click={resetEditor} class="bg-red-500 text-white px-4 py-1 rounded">
          Tilbakestill
        </button>
      </div>

      <textarea
        bind:value={pastedContent}
        placeholder="Lim inn innhold fra .js eller .json seksjonsfil her"
        rows="10"
        class="w-full p-2 border"
      ></textarea>
      <button on:click={parsePastedContent}>Last fra tekst</button>
    </div>

    <!-- Preview -->
    <div class="lg:w-1/2 space-y-10">
      <PreviewHeader
        {sections}
        {raw}
        {copyJSON}
        {showControls}
        {showEditorPopup}
        onOpenPopup={handleOpenPopup}
        onClosePopup={handleClosePopup}
        onToggleControls={handleToggleControls}
      />

      {#each sections as section, sectionIndex}
        <PreviewSection
          {section}
          {sectionIndex}
          {editingIndex}
          {editingSectionIndex}
          {showControls}
          onMoveUp={({ sectionIndex, blockIndex }) => moveBlockUpHandler(sectionIndex, blockIndex)}
          onMoveDown={({ sectionIndex, blockIndex }) => moveBlockDownHandler(sectionIndex, blockIndex)}
          onEdit={({ sectionIndex, blockIndex }) => editBlock(sectionIndex, blockIndex)}
          onDelete={({ sectionIndex, blockIndex }) => deleteBlock(sectionIndex, blockIndex)}
          onDuplicate={({ sectionIndex, blockIndex }) => duplicateBlockHandler(sectionIndex, blockIndex)}
        />
      {/each}
    </div>

  </div>
