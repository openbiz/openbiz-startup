//defines Openbiz System callbacks
var openbizEventsDelegate = {
	onOpenbizLoaded: function(){
		openbiz.colorSetting = {
			"primary":"#3DA0DB",
                  "info":"#B5D1D8",
                  "success":"#2ECC71",
                  "warning":"#FFCC33",
                  "danger":"#E15258",
                  "inverse":"#62707D",
                  "theme":"#f37864",
                  "theme-inverse":"#6CC3A0",
                  "palevioletred":"#913B53" ,
                  "green":"#99CC00",
                  "lightseagreen":"#1ABC9B"
		}
		openbiz.loadApps(['apps/cubi'/*MORE_APPS*/],function(apps){
			for(var i in apps){
                      apps[i].init();
                  }
			Backbone.history.start();
		})
	}
}