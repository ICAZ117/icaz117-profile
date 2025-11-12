<template>
  <div v-if="loading">Redirecting...</div>
  <div v-else-if="error">Not found.</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const loading = ref(true);
const error = ref(false);
const route = useRoute();

onMounted(async () => {
  const db = getFirestore();
  const routerDoc = doc(db, 'router', 'routerDoc');
  try {
    const snap = await getDoc(routerDoc);
    if (snap.exists()) {
      const routes = snap.data().routes || {};
      const target = routes[route.params.customRoute];
      if (target) {
        window.location.replace(target);
        return;
      }
    }
    error.value = true;
  } catch (e) {
    error.value = true;
  } finally {
    loading.value = false;
  }
});
</script>
