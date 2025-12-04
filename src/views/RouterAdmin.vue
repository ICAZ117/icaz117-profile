<template>
  <div class="router-admin">
    <div class="container">
      <header class="admin-header">
        <h1>Admin</h1>
        <p class="muted">Manage dynamic redirects stored in Firestore.</p>
      </header>

      <section class="w-100 create-form card">
        <h3>Create New Redirect</h3>
        <div class="row g-0">
          <input class="input" v-model="newFrom" placeholder="From (e.g. /old-path)" />
          <input class="input" v-model="newTo" placeholder="To (e.g. /new-path)" />
          <button @click="createRoute" class="red-button create-btn">Create</button>
        </div>
      </section>

      <section class="w-100 list card">
        <h3>Existing Redirects</h3>
        <div v-if="loading" class="muted">Loading...</div>
        <div v-else>
          <div v-if="Object.keys(routes).length === 0" class="muted">No redirects found.</div>
          <div class="table-wrap" v-else>
            <table class="routes-table">
            <thead>
              <tr>
                <th style="width:35%">From</th>
                <th style="width:50%">To</th>
                <th style="width:15%">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(to, from) in sortedRoutes" :key="from">
                <td :data-label="'From'">
                  <div v-if="editing !== from">{{ from }}</div>
                  <input v-else v-model="editFrom" />
                </td>
                <td :data-label="'To'">
                  <div v-if="editing !== from">{{ to }}</div>
                  <input v-else v-model="editTo" />
                </td>
                <td class="actions" :data-label="'Actions'">
                  <button class="btn" v-if="editing !== from" @click="startEdit(from, to)">Edit</button>
                  <button class="btn" v-else @click="saveEdit(from)">Save</button>
                  <button class="btn" v-if="editing === from" @click="cancelEdit">Cancel</button>
                  <button class="btn danger" @click="confirmDelete(from)">Delete</button>
                </td>
              </tr>
            </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import { getRoutes, setRoute, deleteRoute } from "../utilities/routerAdmin";

export default {
  components: { Footer },
  data() {
    return {
      routes: {},
      loading: false,
      newFrom: "",
      newTo: "",
      editing: null,
      editFrom: "",
      editTo: "",
    };
  },
  created() {
    this.loadRoutes();
  },
  computed: {
    sortedRoutes() {
      return Object.keys(this.routes)
        .sort()
        .reduce((acc, key) => {
          acc[key] = this.routes[key];
          return acc;
        }, {});
    },
  },
  methods: {
    async loadRoutes() {
      this.loading = true;
      try {
        this.routes = await getRoutes();
      } catch (e) {
        console.error(e);
        this.$notify({ title: "Error", text: "Failed to load routes", type: "error" });
      } finally {
        this.loading = false;
      }
    },
    async createRoute() {
      if (!this.newFrom || !this.newTo) {
        this.$notify({ title: "Error", text: "Both fields required", type: "error" });
        return;
      }

      try {
        await setRoute(this.newFrom, this.newTo);
        this.$notify({ title: "Success", text: "Redirect created", type: "success" });
        this.newFrom = "";
        this.newTo = "";
        await this.loadRoutes();
      } catch (e) {
        console.error(e);
        this.$notify({ title: "Error", text: "Failed to create redirect", type: "error" });
      }
    },
    startEdit(from, to) {
      this.editing = from;
      this.editFrom = from;
      this.editTo = to;
    },
    cancelEdit() {
      this.editing = null;
      this.editFrom = "";
      this.editTo = "";
    },
    async saveEdit(originalFrom) {
      if (!this.editFrom || !this.editTo) {
        this.$notify({ title: "Error", text: "Both fields required", type: "error" });
        return;
      }

      try {
        // If the 'from' changed, set new and remove old
        await setRoute(this.editFrom, this.editTo);
        if (this.editFrom !== originalFrom) {
          await deleteRoute(originalFrom);
        }
        this.$notify({ title: "Success", text: "Redirect updated", type: "success" });
        this.cancelEdit();
        await this.loadRoutes();
      } catch (e) {
        console.error(e);
        this.$notify({ title: "Error", text: "Failed to update redirect", type: "error" });
      }
    },
    async confirmDelete(from) {
      if (!confirm(`Delete redirect from '${from}'?`)) return;
      try {
        await deleteRoute(from);
        this.$notify({ title: "Success", text: "Redirect deleted", type: "success" });
        await this.loadRoutes();
      } catch (e) {
        console.error(e);
        this.$notify({ title: "Error", text: "Failed to delete redirect", type: "error" });
      }
    },
  },
};
</script>

<style scoped>
.router-admin {
  padding: 24px;
  color: white;
}
.container {
  max-width: 980px;
  margin: 24px auto;
}
.admin-header {
  margin-bottom: 16px;
}
.muted {
  opacity: 0.9;
  color: #ddd;
}
.card {
  background: rgba(255,255,255,0.03);
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
}
.create-form .row {
  display: flex;
  gap: 8px;
  align-items: center;
}
input {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  color: #fff;
}
.routes-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; /* prevent very long cells from expanding entire table */
}
.routes-table th,
.routes-table td {
  border-bottom: 1px solid rgba(255,255,255,0.04);
  padding: 10px 8px;
  vertical-align: middle;
}
.routes-table tbody tr:hover { background: rgba(255,255,255,0.02); }
.actions button { margin-right: 6px; }
.btn {
  background: rgba(255,255,255,0.03);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.06);
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
}
.btn:hover { box-shadow: 0 0 6px rgba(211,31,48,0.2); }
.danger {
  background: transparent;
  color: #ff6b6b;
  border: 1px solid rgba(255,107,107,0.15);
}

/* allow long URLs to wrap instead of expanding layout */
td {
  word-break: break-word;
  overflow-wrap: anywhere;
  white-space: normal;
}

.table-wrap {
  overflow-x: auto; /* keep layout sane on small screens */
}

/* create form sizing */
.input { flex: 1 1 auto; min-width: 0; }
.create-btn { width: 120px; }

/* Mobile adjustments */
@media (max-width: 700px) {
  .container { margin: 12px; }
  .create-form .row { flex-direction: column; align-items: stretch; }
  .input { width: 100%; }
  .create-btn { width: 100%; }

  .table-wrap { overflow-x: visible; }
  .routes-table { display: block; }
  .routes-table thead { display: none; }
  .routes-table tbody { display: block; }
  .routes-table tbody tr { display: block; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
  .routes-table td { display: flex; padding: 6px 0; border-bottom: none; }
  .routes-table td::before { content: attr(data-label); color: #bbb; font-weight: 600; width: 30%; flex: 0 0 30%; margin-right: 8px; }
  .routes-table td > div, .routes-table td > input { flex: 1; }
  .actions { margin-top: 8px; gap: 8px; display: flex; }
}
</style>
