<template>
  <div class="leaderboard-page">
      <h1 class="header">Top 10 Scores</h1>
      <br>

      <!-- Table for leaderboard -->
        <div class="leaderboard-table">
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, idx) in leaderboard" :key="idx">
                        <td>{{ idx + 1 }}</td>
                        <td>{{ user.user }}</td>
                        <td>{{ user.score }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
  </div>

  <Footer />
</template>

<script>
import Footer from '../components/Footer.vue'

export default {
    components: {
        Footer
    },
    data() {
        return {
            leaderboard: [],
        };
    },
    async beforeMount() {
        await this.$store.dispatch("fetchLeaderboard");
        this.leaderboard = this.$store.getters.getLeaderboard;
    },
};
</script>

<style>
    .leaderboard-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: calc(100vw - 5px);
        min-height: calc(100vh - var(--navbar-height));
        overflow: visible;
        color: white;
        margin: 2rem 0 3rem 0;
    }
</style>

<style scoped>
    table {
        width: 800px;
        border-collapse: collapse;
        border-spacing: 0;
        font-size: 1.2rem;
        border: 5px solid var(--red);
        border-radius: 15px!important;
        box-shadow: 0 0 20px var(--red);
        border-collapse: separate!important;
    }

    thead {
        background-color: var(--red);
        color: white;
        border-radius: 15px;
    }


    th, td {
        padding: 15px;
        border-bottom: 1px solid var(--red);
    }

    tr {
        transition: all 0.3s ease-in-out;
    }

    tr:hover {
        background-color: #9e0f1db4;
    }

</style>