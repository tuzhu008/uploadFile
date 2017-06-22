$(document).ready(function(){
	$('#fileupload-submit').on('click',function(){
		checkFile('fileupload',2*1024*1024);
	});
    
    /**
     * [checkfile 判断文件是否符合大小]
     * @param  {[string]} selector   [文件选择框的id选择器]
     * @param  {[number]} maxsize    [文件的最大值]
     * @param  {[Object]} browserCfg [浏览器信息]
     * @return {[type]}            [description]
     */
    function checkFile(selector,maxSize){
    	/**提示信息*/
    	console.log('dasd');
    	var errMsg = "上传的附件文件不能超过2M！！！"; 
    	var tipMsg = "您的浏览器暂不支持计算上传文件的大小，确保上传文件不要超过2M，建议使用IE、FireFox、Chrome浏览器。";  
        var browserCfg = getBrower();
        var fileSize = getFileSize(selector,browserCfg);
        if(fileSize==-1){  
            alert(tipMsg);  
            return;  
        }else if(fileSize>maxSize){  
            alert(errMsg);  
            return;  
        }else{  
            alert("文件大小符合要求");  
            return;  
        }  
    }

    /**
     * [checkfile 判断文件是否符合大小]
     * @param  {[string]} selector   [文件选择框的id选择器]
     * @param  {[number]} maxsize    [文件的最大值]
     * @param  {[Object]} browserCfg [浏览器信息]
     * @return {[type]}            [description]
     */
    function getFileSize(selector,browserCfg){
        try{  
            var obj_file = document.getElementById(selector);  
            if(obj_file.value==""){  
                alert("请先选择上传文件");  
                return;  
            }  
            var filesize = 0;  
            if(browserCfg.firefox || browserCfg.chrome ||browserCfg.safari){  
                filesize = obj_file.files[0].size;  
            }else if(browserCfg.ie){  
                var obj_img = document.getElementById('tempimg'); //获取借助的img
                obj_img.dynsrc=obj_file.value;  
                filesize = obj_img.fileSize;  
            }else{  
                alert(tipMsg);  
            	return;  
            }
        }catch(e){
        	alert(e);
        }
        return filesize;
    }

    /**
     * [getBrower 获取浏览器信息]
     * @return {[对象]} [存储浏览器信息的对象]
     */
    function getBrower(){
    	var  browserCfg = {};  
        var ua = window.navigator.userAgent;
        if (ua.indexOf("MSIE")>=1){  
            browserCfg.ie = true;  
        }else if(ua.indexOf("Firefox")>=1){  
            browserCfg.firefox = true;  
        }else if(ua.indexOf("Chrome")>=1){  
            browserCfg.chrome = true;  
        }else if(ua.indexOf("Safari")>=1){
        	browserCfg.safari = true;
        }
        return browserCfg;
    }
});