import { defineConfig } from 'tinacms';

export default defineConfig({
  branch: 'main',
  clientId: 'Ov23li8JXB5JlZkc0mNj',
  token: 'YOUR_GITHUB_PERSONAL_ACCESS_TOKEN',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images/uploads',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'equipment',
        label: '设备',
        path: '_equipment',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: '名称',
            required: true,
          },
          {
            type: 'string',
            name: 'category',
            label: '分类',
            options: ['分析仪器', '光学仪器', '测量仪器', '其他设备'],
          },
          {
            type: 'string',
            name: 'description',
            label: '描述',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'image',
            name: 'image',
            label: '图片',
          },
          {
            type: 'string',
            name: 'features',
            label: '特点',
            list: true,
          },
        ],
      },
      {
        name: 'staff',
        label: '人员',
        path: '_staff',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'name',
            label: '姓名',
            required: true,
          },
          {
            type: 'string',
            name: 'position',
            label: '职位',
          },
          {
            type: 'string',
            name: 'bio',
            label: '简介',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'image',
            name: 'photo',
            label: '照片',
          },
        ],
      },
    ],
  },
}); 