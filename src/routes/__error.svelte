<script>
  import { goto } from '$app/navigation';
  import Modal from '../components/Modal.svelte';

  let showModal = true;

  const handleCloseModal = () => {
    showModal = false;
    goto(`/`);
  };
</script>

{#if showModal}
  <input class="modal-toggle" type="checkbox" bind:checked={showModal} />
  <Modal message="Sorry! Invalid page." on:closemodal={handleCloseModal} />
{/if}
