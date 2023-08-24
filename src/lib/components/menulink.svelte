<script>
    export let text;
    export let link;
</script>

<div class="menulink-container">
    <a href={link} class="text-slate-100 text-base">{@html text}</a>
</div>

<style>
.menulink-container{
    margin-bottom: 10px;
}
a:hover{
    color: #ff79c6;
}
</style>
