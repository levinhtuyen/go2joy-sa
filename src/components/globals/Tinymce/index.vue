<template>
  <div
    :class="{ 'fullscreen': fullscreen }"
    class="tinymce-container editor-container"
  >
    <editor
      :value="value"
      :id="tinymceId"
      :init="init"
      class="tinymce-textarea"
      @onClick="onClick"
      @input="handleInput"
    />
    <div class="editor-custom-btn-container">
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
    </div>
  </div>
</template>

<script>
import plugins from './plugins'
import toolbar from './toolbar'
import Editor from '@tinymce/tinymce-vue'
import EditorImage from './components/EditorImage.vue'
export default {
  name: 'Tinymce',
  components: {
    Editor,
    EditorImage
  },
  props: {
    id: {
      type: String,
      default: function () {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 550
    }
  },
  computed: {
    init () {
      const _this = this
      return {
        image_caption: true,
        height: this.height,
        imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
        selector: `#${this.tinymceId}`,
        body_class: 'panel-body ',
        object_resizing: false,
        menubar: this.menubar,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        plugins: this.plugins,
        toolbar: this.toolbar,
        toolbar_mode: 'floating',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        setup (editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        }
      }
    }
  },
  data () {
    return {
      plugins: plugins,
      toolbar: toolbar,
      tinymceId: this.id,
      fullscreen: false
    }
  },
  methods: {
    imageSuccessCBK (arr) {
      const _this = this
      arr.forEach(v => {
        tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
      })
    },
    destroyTinymce () {
      if (this.fullscreen) {
        tinymce.get(this.tinymceId).execCommand('mceFullScreen')
      }
      if (tinymce.get(this.tinymceId)) {
        tinymce.get(this.tinymceId).destroy()
      }
    },
    handleInput (value) {
      this.$emit('input', value)
    },
    onClick (e) {
      this.$emit('onClick', e, tinymce)
    }
  },
  destroyed () {
    this.destroyTinymce()
  }
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}
.tinymce-container>>>.mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 8px;
  top: 6px;
  z-index: 100;
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>
