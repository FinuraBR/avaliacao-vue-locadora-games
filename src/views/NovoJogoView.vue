<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <h2 class="mb-4">Cadastrar Novo Jogo</h2>

      <form @submit.prevent="cadastrarJogo">
        <div class="mb-3">
          <label for="titulo" class="form-label">Título</label>
          <input type="text" id="titulo" v-model="novoJogo.titulo" class="form-control" required />
        </div>

        <div class="mb-3">
          <label for="plataforma" class="form-label">Plataforma</label>
          <input type="text" id="plataforma" v-model="novoJogo.plataforma" class="form-control" required />
        </div>

        <div class="mb-3">
          <label for="genero" class="form-label">Gênero</label>
          <input type="text" id="genero" v-model="novoJogo.genero" class="form-control" required />
        </div>

        <div class="mb-3">
          <label for="anoLancamento" class="form-label">Ano de Lançamento</label>
          <input type="number" id="anoLancamento" v-model.number="novoJogo.anoLancamento" class="form-control" required />
        </div>

        <div class="mb-3">
          <label for="disponivel" class="form-label">Disponibilidade</label>
          <select id="disponivel" v-model="novoJogo.disponivel" class="form-select" required>
            <option :value="true">Disponível</option>
            <option :value="false">Locado</option>
          </select>
        </div>

        <div class="mt-4">
          <button type="submit" class="btn btn-primary me-2">Salvar</button>
          <button type="button" class="btn btn-secondary" @click="router.push('/jogos')">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import type { Jogo } from '@/interfaces/Jogo'

const router = useRouter()
const API_URL = 'http://localhost:3000/jogos'

const novoJogo = ref<Omit<Jogo, 'id'>>({
  titulo: '',
  plataforma: '',
  genero: '',
  anoLancamento: new Date().getFullYear(),
  disponivel: true
})

const cadastrarJogo = async () => {
  try {
    await axios.post(API_URL, novoJogo.value)
    router.push('/jogos')
  } catch (error) {
    console.error('Erro ao cadastrar o jogo:', error)
    alert('Erro ao realizar o cadastro do novo jogo.')
  }
}
</script>