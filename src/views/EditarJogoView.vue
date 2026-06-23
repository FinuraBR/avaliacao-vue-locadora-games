<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <h2 class="mb-4">Editar Jogo</h2>

      <form @submit.prevent="atualizarJogo">
        <div class="mb-3">
          <label for="titulo" class="form-label">Título</label>
          <input type="text" id="titulo" v-model="jogo.titulo" class="form-control" required />
        </div>

        <div class="mb-3">
          <label for="genero" class="form-label">Gênero</label>
          <input type="text" id="genero" v-model="jogo.genero" class="form-control" required />
        </div>

        <div class="mb-3">
          <label for="plataforma" class="form-label">Plataforma</label>
          <input type="text" id="plataforma" v-model="jogo.plataforma" class="form-control" required />
        </div>

        <div class="mb-3">
          <label for="anoLancamento" class="form-label">Ano de Lançamento</label>
          <input type="number" id="anoLancamento" v-model.number="jogo.anoLancamento" class="form-control" required />
        </div>

        <div class="mt-4">
          <button type="submit" class="btn btn-primary me-2">Salvar alterações</button>
          <button type="button" class="btn btn-secondary" @click="router.push('/jogos')">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import type { Jogo } from '@/interfaces/Jogo'

const router = useRouter()
const route = useRoute()
const API_URL = 'http://localhost:3000/jogos'

const jogoId = Number(route.params.id)

const jogo = ref<Jogo>({
  id: jogoId,
  titulo: '',
  genero: '',
  plataforma: '',
  anoLancamento: new Date().getFullYear(),
  disponivel: true
})

const buscarJogo = async () => {
  try {
    const response = await axios.get<Jogo>(`${API_URL}/${jogoId}`)
    jogo.value = response.data
  } catch (error) {
    console.error('Erro ao buscar o jogo:', error)
    alert('Não foi possível carregar os dados do jogo.')
  }
}

const atualizarJogo = async () => {
  try {
    await axios.put(`${API_URL}/${jogoId}`, jogo.value)
    router.push('/jogos')
  } catch (error) {
    console.error('Erro ao atualizar o jogo:', error)
    alert('Erro ao salvar as alterações.')
  }
}

onMounted(() => {
  buscarJogo()
})
</script>