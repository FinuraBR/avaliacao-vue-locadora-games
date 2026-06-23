<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Acervo de Jogos</h2>
      <RouterLink to="/jogos/novo" class="btn btn-primary">
        Cadastrar Novo Jogo
      </RouterLink>
    </div>

    <div v-if="jogos.length > 0" class="table-responsive">
      <table class="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th>Título</th>
            <th>Plataforma</th>
            <th>Gênero</th>
            <th>Ano</th>
            <th>Disponível</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="jogo in jogos" :key="jogo.id">
            <td>{{ jogo.titulo }}</td>
            <td>{{ jogo.plataforma }}</td>
            <td>{{ jogo.genero }}</td>
            <td>{{ jogo.anoLancamento }}</td>
            <td>
              <span v-if="jogo.disponivel" class="badge bg-success">Disponível</span>
              <span v-else class="badge bg-danger">Locado</span>
            </td>
            <td>
              <RouterLink :to="`/jogos/${jogo.id}/editar`" class="btn btn-sm btn-warning me-2">
                Editar
              </RouterLink>
              <button @click="excluirJogo(jogo.id)" class="btn btn-sm btn-danger">
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="alert alert-info text-center" role="alert">
      Nenhum jogo cadastrado no acervo até o momento.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import type { Jogo } from '@/interfaces/Jogo'

const API_URL = 'http://localhost:3000/jogos'

const jogos = ref<Jogo[]>([])

const buscarJogos = async () => {
  try {
    const response = await axios.get<Jogo[]>(API_URL)
    jogos.value = response.data
  } catch (error) {
    console.error('Erro ao buscar a lista de jogos:', error)
    alert('Erro ao carregar o acervo de jogos.')
  }
}

const excluirJogo = async (id: number) => {
  const confirmacao = window.confirm('Tem certeza que deseja excluir este jogo permanentemente do acervo?')
  
  if (confirmacao) {
    try {
      await axios.delete(`${API_URL}/${id}`)
      await buscarJogos()
    } catch (error) {
      console.error('Erro ao excluir o jogo:', error)
      alert('Não foi possível excluir o jogo selecionado.')
    }
  }
}

onMounted(() => {
  buscarJogos()
})
</script>