<script setup lang="ts">
import Uploader from 'vue-media-upload';
import { ref, watch } from 'vue';

interface Props {
  modelValue?: string | string[];
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: ''
});

const emit = defineEmits(['update:modelValue']);
const allowsMultipleUploads = ref();
// Convert string or string[] to array format for media upload
const convertToMediaArray = (value: string | string[]): any[] => {
  allowsMultipleUploads.value = Array.isArray(value) ? null : 1;
  const values = Array.isArray(value) ? value : [value];
  return values.map((element) => ({ name: element }));
};

const media = ref(convertToMediaArray(props.modelValue));
const uploadUrl = ref(import.meta.env.VITE_UPLOAD_URL);

const onChanged = (files: any) => {
  const fileNames = files.map((file: any) => file.name);
  const emitValue = Array.isArray(props.modelValue) ? fileNames : fileNames[0];
  emit('update:modelValue', emitValue);
};

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
  media.value = convertToMediaArray(newValue);
});
</script>

<template>
  <Uploader 
    :server="uploadUrl" 
    @change="onChanged" 
    :media="media"
    :max="allowsMultipleUploads" 
  ></Uploader>
</template>
