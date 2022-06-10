<template>
  <div class="counselings-mgt">
    <sa-section>
      <div v-if="loading == false">
        <div v-if="user && user.appUser">
          <el-row>
            <el-col :span="12">
              <el-row>
                <el-col :span="4">
                  <p>{{ $t("page.replyCounselingMgt.nickname") }}</p>
                </el-col>
                <el-col :span="20">
                  <el-input type="text" disabled="disabled" :value="user.appUser.nickName"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <p>{{ $t("page.replyCounselingMgt.user_id") }}</p>
                </el-col>
                <el-col :span="20">
                  <el-input type="text" disabled="disabled" :value="user.appUser.email"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <p>{{ $t("page.replyCounselingMgt.birthday") }}</p>
                </el-col>
                <el-col :span="20">
                  <el-input type="text" disabled="disabled" :value="user.appUser.birthday"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <p>{{ $t("page.replyCounselingMgt.email") }}</p>
                </el-col>
                <el-col :span="20">
                  <el-input type="text" disabled="disabled" :value="user.appUser.email"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <p>{{ $t("page.replyCounselingMgt.login_by") }}</p>
                </el-col>
                <el-col :span="20">
                  <el-input type="text" disabled="disabled" :value="loginBy"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <p>{{ $t("page.replyCounselingMgt.res_time") }}</p>
                </el-col>
                <el-col :span="20">
                  <el-input type="text" disabled="disabled" :value="this.formatDate(user.createTime)"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <p>{{ $t("page.replyCounselingMgt.last_open_app") }}</p>
                </el-col>
                <el-col :span="20">
                  <el-input type="text" disabled="disabled" :value="user.appUser.mobileDevice.address"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="4">
                  <p>{{ $t("page.replyCounselingMgt.member_id") }}</p>
                </el-col>
                <el-col :span="20">
                  <el-input type="text" disabled="disabled" :value="user.appUser.memberId"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <p>{{ $t("page.replyCounselingMgt.gender") }}</p>
                </el-col>
                <el-col :span="20">
                  <el-input type="text" disabled="disabled" :value="gender"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <p>{{ $t("page.replyCounselingMgt.mobile") }}</p>
                </el-col>
                <el-col :span="20">
                  <el-input type="text" disabled="disabled" :value="user.appUser.mobile"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <p>{{ $t("page.replyCounselingMgt.address") }}</p>
                </el-col>
                <el-col :span="20">
                  <el-input type="text" disabled="disabled" :value="user.appUser.address"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <p>{{ $t("page.replyCounselingMgt.last_update") }}</p>
                </el-col>
                <el-col :span="20">
                  <el-input type="text" disabled="disabled" :value="this.formatDate(user.lastUpdate)"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <p>{{ $t("page.replyCounselingMgt.device_code") }}</p>
                </el-col>
                <el-col :span="20">
                  <el-input type="text" disabled="disabled" :value="deviceCode"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <p>{{ $t("page.replyCounselingMgt.status") }}</p>
                </el-col>
                <el-col :span="20">
                  <el-input type="text" disabled="disabled" :value="status"></el-input>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div>
              <el-row>
                 <el-col :span="24">
                    <p class="text-Q-A" >{{ $t('page.replyCounselingMgt.content')}}</p>
                    <div tyle="display: block;" >
                        <div class="scroll-replay" ref="replyBlock">
                            <div
                                v-for="(counseling,index) in counselings.counselingDetails"
                                :key="index">
                                <div class="content-box"  v-if="counseling.replyStaff.sn == null">
                                    <p class="content">{{ counseling.content }}</p>
                                    <p class="create-time"><span class="bold">{{counseling.appUser ? counseling.appUser.nickName : ' '}}</span> {{formatDate(counseling.lastUpdate)}}</p>
                                </div>
                                <div class="reply-box" style="margin-left: 53%;" v-if="counseling.replyStaff.sn !== null">
                                    <p class="content">{{ counseling.content}}</p>
                                    <p class="create-time"><span class="bold">{{counseling ? counseling.replyStaff.fullName : ' '}}</span> {{formatDate(counseling.lastUpdate)}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="reply-button" style="width: 703px;float: right;">
                            <textarea rows="3" style="width: 100%;" v-model="content"></textarea>
                            <div class="float-right">
                                <el-button  type="success" size="large" @click="onDone">
                                    {{$t('button.done')}}
                                </el-button>
                                <el-button  type="primary" size="large" @click="onReply">
                                    {{$t('button.reply')}}
                                </el-button>
                                <el-button  type="info" size="large">
                                    {{$t('button.back')}}
                                </el-button>
                            </div>
                        </div>
                    </div>
                 </el-col>
              </el-row>
          </div>
        </div>
        <div v-else>
            <div style="text-align: center;padding: 20px;">
              <p>{{$t('no_data')}}</p>
            </div>
        </div>
      </div>
      <div v-else style="text-align: center;padding: 20px;">
        <h2><i class="el-icon-loading"></i></h2>
        <h2> {{$t('loading')}} ...</h2>
      </div>
    </sa-section>
  </div>
</template>
<script>
import saSection from '@/components/globals/SaSection.vue'
import { getCounseling, listQuestionAndAnswer, onReplyCounseling, onDoneCounseling } from './api'

export default {
  name: 'UserMgt',
  components: {
    saSection
  },
  data () {
    return {
      loading: true,
      user: {},
      counselings: [],
      content: '',
      sn: this.$route.params.sn
    }
  },
  computed: {
    loginBy () {
      return this.user.appUser ? (this.user.appUser.viaApp === 1 ? 'Manual' : (this.user.appUser.viaApp === 2 ? 'Facebook' : (this.user.appUser.viaApp === 3 ? 'Google' : 'Apple'))) : ' '
    },
    gender () {
      return this.user.appUser ? this.user.appUser.gender === 1 ? this.$t('gender.male') : this.$t('gender.female') : ' '
    },
    deviceCode () {
      return this.user.appUser ? (this.user.appUser.mobileDevice.os === '1' ? 'IOS' : 'Android') + ' | ' + this.user.appUser.mobileDevice.appVersion + ' | ' + (this.user.appUser.mobileDevice.language === 3 ? 'Vietnamese' : (this.user.appUser.mobileDevice.language === 2 ? 'English' : 'Korean')) + ' | ' + this.user.appUser.mobileDevice.osVersion + ' | ' + this.user.appUser.mobileDevice.phoneModel + ' | ' + this.formatDate(this.user.appUser.mobileDevice.registerTime) : ' '
    },
    status () {
      return this.user.appUser ? this.user.appUser.isLogin === 1 ? this.$t('status.login') : this.$t('status.un_login') : ' '
    }
  },
  created () {
    this.getUser()
  },
  mounted () {
  },
  watch: {

  },
  methods: {
    async getCounselings () {
      try {
        const { data } = await listQuestionAndAnswer(this.sn)
        this.counselings = data.data
      } catch (error) {
        return false
      } finally {
        this.loading = false
      }
    },
    async getUser () {
      try {
        const { data } = await getCounseling(this.sn)
        this.user = data.data
        this.getCounselings()
      } catch (error) {
        return false
      } finally {
        this.loading = false
      }
    },
    async onReply () {
      try {
        const { data } = await onReplyCounseling(this.sn, { content: this.content })
        this.counselings.counselingDetails.push(data.data)
        this.content = ''
        this.scrollToEnd()
        this.$message({
          type: 'success',
          message: `${this.$t('message.success')}`
        })
      } catch (error) {
        return false
      }
    },
    async onDone () {
      try {
        const dataJson = {
          title: this.user.title,
          readStatus: this.user.readStatus,
          scope: this.user.scope,
          status: this.user.status,
          appUserSn: this.user.appUser.sn,
          qaStatus: 2
        }
        await onDoneCounseling(this.sn, dataJson)
        this.$message({
          type: 'success',
          message: `${this.$t('message.success')}`
        })
      } catch (error) {
        return false
      }
    },
    scrollToEnd () {
      this.$refs.replyBlock.scrollTop = this.$refs.replyBlock.scrollHeight
    }
  }
}
</script>
<style lang="scss">
.content-box {
    margin-right: 30%;
    display: inline-block;
    width: 47%;
    background-color: #d9edf7;
    margin-bottom: 10px;
}
.reply-box {
    display: inline-block;
    width: 47%;
    margin-bottom: 10px;
    background-color: #dff0d8;
}
.content {
    margin-bottom: 0;
    padding: 10px 23px;
}
.create-time {
    float: right;
    padding: 0 18px;
    font-size: 12px;
    margin-bottom: 10px;
}
textarea {
    resize: none;
}
.scroll-replay {
    height: 290px;
    overflow: scroll;
    width: 100%;
    margin-bottom: 10px;
}
p.content {
    text-align: left;
}
.scroll-replay::-webkit-scrollbar {
    -webkit-appearance: none !important;
    height: 8px;
}
.scroll-replay::-webkit-scrollbar-thumb {
    border-radius:  10px;
    margin: 5px 0;
    background-color: rgba(0, 0, 0, .5);
    box-shadow: 0 0 1px rgba(255, 255, 255, .5);
}
.scroll-replay::-webkit-scrollbar-thumb:hover{
    width: 12px;
    background: #999999;
}
.form-background {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
}
@media (max-width: 667px){
    .text-Q-A{
        bottom: 308px;
    }
    .scroll-replay {
        margin-top: 12px;
    }
    .reply-button textarea {
        margin-right: 3px;
    }
}
@media (max-width: 1024px) {
    .scroll-replay {
        margin-top: 12px;
    }
    .text-Q-A {
        bottom: 308px;
    }
}
@media (max-width: 375px) {
    .create-time {
        font-weight: bold;
        font-size: 9px;
    }
}
</style>
