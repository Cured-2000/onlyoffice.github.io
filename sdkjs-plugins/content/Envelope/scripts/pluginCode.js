(function(window, undefined){  


    //create scrollable div for text entry
	var myscroll = window.Asc.ScrollableDiv;
    //text is passed in here ???
    window.Asc.plugin.init = function(text) {

    // text comes in the html format because its in ana iframe so we will have to replace the text 
    text = text.replace(/<span style="mso-tab-count:1;">	<\/span>/g,"%%%bpmn%%%");
	myscroll = window.Asc.ScrollableDiv;
    //define where the text will be placed within the modal
		myscroll.create_div("div_settings", {
			width: "",
			height: "",
			left: "10px",
			right: "10px",
			top: "60px",
			bottom: "5px"
});		
		myscroll.create_div("div_settings", {
			width: "",
			height: "",
			left: "10px",
			right: "10px",
			top: "60px",
			bottom: "5px"
});
        //sets up text boxes in the scrollable divs 
		code_field = document.getElementById("conteiner_id1");
		container = document.getElementById('scrollable-container-id1');
		$(container).addClass('codefield');
		$(code_field).addClass('content');
		$(container).addClass('hljs');


        // sets text inside of the container
		code_field.focus();
		code_field.innerHTML = text;
		text = code_field.innerText;
		code_field.innerText = text;
		text = code_field.innerHTML;
		text = text.replace(/%%%bpmn%%%/g,"\t");
        


        





    }






//this code gets the index of the selected text form the ifrmae???
	$.fn.get_selection_range = function() {
		var selection = window.getSelection();
		if (!selection.rangeCount)
			return null;
			
		var range = window.getSelection().getRangeAt(0);
		var cloned_range = range.cloneRange();
		cloned_range.selectNodeContents(this.get(0));
		cloned_range.setEnd(range.startContainer, range.startOffset);
		var start = cloned_range.toString().length;
		var selected_text = range.toString();
		var end = start + selected_text.length;
		var result = {
			start: start,
			end: end,
			selected_text: selected_text
		}
		return result;
	};
// This code gets the actual data from the iframe document this is a juery extended function
	$.fn.set_selection = function(start, end) {
		var target_element = this.get(0);
		start = start || 0;
		if (typeof(target_element.selectionStart) == "undefined") {
			if (typeof(end) == "undefined") end = target_element.innerHTML.length;
	
			var character_index = 0;
			var range = document.createRange();
			range.setStart(target_element, 0);
			range.collapse(true);
			var node_stack = [target_element];
			var node = null;
			var start_found = false;
			var stop = false;
	
			while (!stop && (node = node_stack.pop()) ) {
				if (node.nodeType == 3){
					var next_character_index = character_index + node.length;
					if (!start_found && start >= character_index && start <= next_character_index) {
						range.setStart(node, start - character_index);
						start_found = true;
					}
					
					if (start_found && end >= character_index && end <= next_character_index) {
						range.setEnd(node, end - character_index);
						stop = true;
					}
					character_index = next_character_index;
				} else {
					var child_counter = node.childNodes.length;
					while (child_counter --) {
						node_stack.push(node.childNodes[child_counter]);
					}
				}
			}

			var selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
		} else {
			if (typeof(end) == "undefined") end = target_element.value.length;
			target_element.focus();
			target_element.selectionStart = start;
			target_element.selectionEnd = end;
		}
	};
})(window, undefined);