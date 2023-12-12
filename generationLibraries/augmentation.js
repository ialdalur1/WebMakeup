/**
 *
 * @param augmentationModel
 * @constructor
 */
Augmentation = function(name,augmentationModel){
	this.name = name;
    this.model = augmentationModel;
};

/**
 *
 */
Augmentation.prototype.run = function(){
	var name =  this.name;
	var model = this.model;
	setTimeout(function(){
		if($('[data_wmwidget_id]').length==0){
			putNodesAnchors(name,model);
		}
		//(new Animations(model)).create();
	}, 0);
};
