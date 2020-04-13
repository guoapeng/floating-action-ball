
 
         var suspensionBall = new SuspensionBall(document.getElementById('ballId1'), "www.baidu.com")
         suspensionBall.init()
         
         var suspensionBall2 = new SuspensionBall(document.getElementById('ballId2'), "www.baidu.com")
          suspensionBall2.init()
          
          var suspensionBall3 = new SuspensionBall(document.getElementById('ballId3'), "www.baidu.com")
          suspensionBall3.init()
          
          function suspensionBallToggle (panelId) {
            if($(panelId).height()>0){
                    $(panelId).stop(true,false).animate({height:"0px"},500)
                } else {
                    $(panelId).stop(true,false).animate({height:"100%"},500)
                }  
          }
  