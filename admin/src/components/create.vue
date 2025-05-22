<template>
    <el-dialog v-model="dialogVisible" title="创建页面" :before-close="handleClose">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="80px" class="px-4">
            <el-form-item label="页面名称" prop="page_name" class="w-100">
                <el-input v-model.trim="form.page_name" maxlength="8" placeholder="请输入页面名称" />
            </el-form-item>

            <el-form-item label="页面介绍" class="w-100">
                <el-input v-model="form.description" maxlength="20" placeholder="请输入页面介绍" />
            </el-form-item>

            <el-form-item label="页面图标" prop="icon">
                <div class="upload-img-container">
                    <el-upload class="image-uploader" action="" :http-request="handleUpload"
                        accept="image/jpeg,image/jpg,image/png" :show-file-list="false" :before-upload="beforeUpload">
                        <div v-if="form.icon" class="image-wrap">
                            <el-image :src="form.icon" fit="cover" class="w-full h-full" />
                            <div class="image-delete" @click.stop="handleDelete">
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </div>
                        </div>
                        <div v-else class="upload-placeholder">
                            <el-icon class="upload-icon">
                                <Plus />
                            </el-icon>
                        </div>
                    </el-upload>
                </div>
            </el-form-item>
        </el-form>

        <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleSubmit" :disabled="!form.page_name" :loading="isSubmitting">
                确认
            </el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElForm, ElMessage } from 'element-plus';
import { defineModel } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { fetchUploadImage, fetchCreatePage } from '@/api';
import { useRouter } from 'vue-router';

const dialogVisible = defineModel<boolean>();

const form = reactive({
	page_name: '',
	description: '',
	icon: '', // 默认图标
});
const router = useRouter();
const rules = reactive({
	page_name: [{ required: true, message: '页面名称为必填项', trigger: 'blur' }],
	icon: [{ required: true, message: '页面图标为必填项', trigger: 'blur' }],
});

const formRef = ref<InstanceType<typeof ElForm>>();
const isSubmitting = ref(false); // 提交加载状态

// 上传前校验（大小限制）
const beforeUpload = (file: File) => {
	const size = file.size / 1024 / 1024;
	if (size > 2) {
		ElMessage.error(`图片大小不能超过2MB`);
		return false;
	}
	return true;
};

// 自定义上传逻辑
const handleUpload = async (uploadFile: { file: File }) => {
	const formData = new FormData();
	formData.append('file', uploadFile.file);

	const { url } = await fetchUploadImage({
		data: formData,
	});
	form.icon = url;
};

const handleDelete = () => {
	form.icon = '';
};

const handleClose = (done: () => void) => {
	form.page_name = '';
	form.description = '';
	form.icon = ''; // 恢复默认图标
	done();
};

const handleSubmit = async () => {
	if (!formRef.value) return;
	isSubmitting.value = true;

	const isValid = await new Promise<boolean>((resolve) => {
		formRef.value!.validate(resolve);
	});

	if (isValid) {
		const { id } = await fetchCreatePage({
			toastPending: true,
			data: form,
		});
		router.push({ name: 'design', params: { id } });
		dialogVisible.value = false;
	}

	isSubmitting.value = false;
};
</script>

<style scoped lang="scss">
.upload-img-container {
    .image-uploader {
        width: 120px;
        height: 120px;
        border: 1px dashed #d9d9d9;
        border-radius: 4px;
        cursor: pointer;
        position: relative;
        overflow: hidden;

        &:hover {
            border-color: #409eff;
        }

        .image-wrap {
            width: 120px;
            height: 120px;
            position: relative;

            .uploaded-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .image-delete {
                position: absolute;
                top: 4px;
                right: 4px;
                cursor: pointer;
                display: none;
            }

            &:hover {
                .image-delete {
                    display: block;
                }
            }
        }

        .upload-placeholder {
            width: 120px;
            height: 120px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #999;

            .upload-icon {
                font-size: 24px;
            }
        }
    }
}
</style>