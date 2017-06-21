//页面加载		
		$(document).ready(function(){

			//alert(myMusics);

			$("#"+"box").append(createBox());
			playMusic(1);
			
			//按钮"下一首"单击事件
			$("#nextMusic").click(function(){
				playMusic(1,1);
			});
			//按钮"上一首"单击事件
			$("#lastMusic").click(function(){
				playMusic(2);
			});
			////按钮"播放/暂停"单击事件
			$("#playMusic").click(function(){
				if($(this).val()=="播放"){
					$(this).val("暂停");
					document.getElementById("media").play();
				}else if($(this).val()=="暂停"){
					$(this).val("播放");
					document.getElementById("media").pause();
				}
			});
			
			//快进
			$("#fast").click(function(){
				var media = document.getElementById("media");
				media.currentTime+=5;
			});
			//快退
			$("#rewind").click(function(){
				var media = document.getElementById("media");
				media.currentTime-=5;
			});
			//播放状态
			$("#playState").change(function(){
				playState = $(this).val();				
			});
			
			$("li").mouseover(function(){
				$(this).css("background-color","rgba(50,50,50,0.5)");
			});
			
			$("li").mouseout(function(){
				$(this).css("background-color","#FFFFFF");
				$($("li")[index]).css("background-color","rgba(50,50,50,0.2)");
			});
			
			
		});
		
		//点击名字播放音乐
		function clickName(i){
			index=i;
			playMusic(0);
		}
		
		//音乐播放
		function playMusic(s,n){
			$("#playMusic").val("暂停");
			if(s==0){//点击名字播放音乐
			
			}else if(s==1){//下一首
				$("#playMusic").val("暂停");
				if(playState==0){//单曲循环
					if(n==0){
					
					}else if(n==1){
						index++;
						if(index>=myMusics.length){
							index=0;
						}
					}
				}else if(playState==1){//列表循环
					index++;
					if(index>=myMusics.length){
						index=0;
					}
				}else if(playState==2){//随机播放
					index = Math.floor(Math.random()*myMusics.length);
				}
			}else if(s==2){//上一首
				index--;
				if(index<0){
					index=myMusics.length-1;
				}
			}
			
			
			//修改audio资源路径
			$("#media").attr("src",myMusics[index].src);
			//音乐播放
			$("#media").play;
			//显示音乐名称
			$("#musicTitle").text("歌名："+ myMusics[index].title);
			$("title").text(myMusics[index].title);
			//重置li列表背景色
			$("#box").children("li").css("background-color","#FFFFFF");
			$("#box").children("li").css("font-weight","normal");
			
			//修改播放音乐背景色
			$($("#box").children("li")[index]).css("background-color","rgba(50,50,50,0.5)");
			$($("#box").children("li")[index]).css("font-weight","bold");
			
			$("#sliding").offset({left:60});
		}
		//时间获取
		function timeupdate(){
			//获取audio元素
			var media = document.getElementById("media");
			//音乐当前位置
			var curr = Math.floor(media.currentTime);
			//音乐长度
			var dur = Math.floor(media.duration);
			$("#totalTime").text("时长："+formatTime(dur));
			$("#currTime").text("当前："+formatTime(curr));
		}
		//音乐计时格式
		function formatTime(time){
			
			var h=0,i=0,s=parseInt(time);
			if(s>60){
				i=parseInt(s/60);
				s=parseInt(s%60);
				if(i > 60) {
					h=parseInt(i/60);
					i = parseInt(i%60);
				}
			}
			var zero=function(v){
				return (v>>0)<10?"0"+v :v;
			};
			return (zero(h)+":"+zero(i)+":"+zero(s));
		};