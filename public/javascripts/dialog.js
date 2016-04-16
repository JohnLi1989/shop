/**
 * Created by john on 16/4/16.
 */


//弹窗
(function($){
    $.fn.extend({
        dialog:function(options){
            var params={
                type: "modal",	//寮圭獥绫诲瀷(modal涓洪粯璁わ紝overlay)
                dialogTitle: "榛樿澶撮儴",	//寮圭獥鏍囬
                dialogBody: "",	//寮圭獥鍐呭锛堝彲甯tml锛�
                dialogFoot: "",	//寮圭獥搴曢儴锛堝彲甯tml锛�
                canshu: "",
                callbackFunc:null,
                callbackFunc2:null  //鍥炶皟鍑芥暟鎺ュ彛
            }
            $.extend(params,options);
            var $this = $(this);

            //鍒ゆ柇寮圭獥绫诲瀷
            if (params.type == "overlay") {
                $this.addClass('k-modal-overlay').find('.k-modal-backdrop').remove();
            }else if(params.type == "adsorb"){
                $this.removeClass('k-modal-overlay').prepend('<div class="k-modal-backdrop"></div>');
                $this.addClass('k-modal-adsorb');
            }else{
                $this.removeClass('k-modal-adsorb');
                $this.removeClass('k-modal-overlay').prepend('<div class="k-modal-backdrop"></div>');
            }
            //鍒ゆ柇寮圭獥鍐呭鍜屽簳閮ㄦ槸鍚︿负绌�
            if (params.dialogBody !== "") {
                $this.find('#jq_km_bd').addClass('k-modal-body');
            }
            if (params.dialogFoot !== "") {
                $this.find('#jq_km_ft').addClass('k-modal-footer');
            }
            $this.find('.k-modal-title').html(params.dialogTitle);
            $this.find('#jq_km_bd').html(params.dialogBody);
            $this.find('#jq_km_ft').html(params.dialogFoot);

            //鏄剧ず寮圭獥
            $this.fadeIn();
            //鍏抽棴浜嬩欢浠ュ強鍙栨秷缁戝畾浜嬩欢鍜屾竻闄ゆ牱寮�
            var closeHandler=function(event) {
                //$("#share").addClass("in");
                $this.hide();
                $this.removeClass('k-modal-overlay');
                $this.removeClass('k-modal-adsorb');

                $this.find('.k-modal-backdrop').remove();
                $this.find('#jq_km_bd').removeClass('k-modal-body');
                $this.find('#jq_km_ft').removeClass('k-modal-footer');
                $this.find('.k-jq_closeModal').unbind('click',closeHandler);
                if (params.callbackFunc) {
                    params.callbackFunc();
                }
            }

            var successHandler=function(event) {
                //$("#share").addClass("in");
                $this.hide();
                $this.removeClass('k-modal-overlay');
                $this.removeClass('k-modal-adsorb');

                $this.find('.k-modal-backdrop').remove();
                $this.find('#jq_km_bd').removeClass('k-modal-body');
                $this.find('#jq_km_ft').removeClass('k-modal-footer');
                $this.find('.k-jq_successModal').unbind('click',successHandler);
                if (params.callbackFunc2) {
                    params.callbackFunc2(params.canshu);
                }
            }
            $this.find('.k-jq_closeModal').bind('click',closeHandler);
            $this.find('.k-jq_successModal').bind('click',successHandler);
        }

    });

})(jQuery)