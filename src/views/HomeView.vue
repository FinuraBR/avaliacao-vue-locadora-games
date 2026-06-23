<template>
  <div class="container text-center py-5">
    <div class="row justify-content-center align-items-center" style="min-height: 60vh;">
      <div class="col-md-8">
        
        <h1 class="display-4 fw-bold mb-3 text-primary">GameLoc</h1>
        
        <p class="lead text-muted mb-4">
          Sua locadora de jogos favorita. Explore nosso catálogo, gerencie seus títulos e encontre a sua próxima grande aventura gamer!
        </p>
        
        <RouterLink to="/jogos" class="btn btn-primary btn-lg px-4 shadow-sm">
          Ver Acervo de Jogos
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Nenhuma lógica necessária — página estática
import { RouterLink } from 'vue-router'
</script>