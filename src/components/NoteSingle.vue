<script setup>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
defineProps({
  note: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div class="card-category-1">
    <div class="basic-card basic-card-aqua">
      <div class="card-content">
        <span>{{ note.title }}</span>
        <p>
          {{ note.desc }}
        </p>
      </div>
      <div class="card-link">
        <a @click="$emit('edit', note)" title="Read Full"><span>Edit</span></a>
        <a @click="$emit('remove', note.id)" title="Read Full"
          ><span>Delete</span></a
        >
      </div>
    </div>
  </div>
</template>

