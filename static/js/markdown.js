function parse_markdown(markdown, options){
    var start_tag = /^\[((list|title|img))\]/;
    var end_tag = /^\[\/((list|title|img))\]/;

    var result = "";
    var project_dir = options.dir ? options.dir : "/";
    var type = options.type ? options.type : "slide";
    var id = options.id ? options.id : "";

    var index, chars, match, stack = [];
    stack.last = function(){
        return this[ this.length - 1 ];
    };

    function parse_start_tag(tag, tag_name){
        stack.push(tag_name);
        if (tag_name == "list"){
            result += "<ul><li>";
        }
        else if (tag_name == "img"){
            result += "<img src='" + project_dir;
        }
    }

    function parse_end_tag(tag, tag_name){
        if (tag_name == "list"){
            result += "</li></ul>";
        }
        stack.pop();
    }


    result = "<div class='" + type + " " + id + "'>"
    while ( markdown ) {
        chars = true;

        // end tag
        if (markdown.indexOf("[/") == 0){
            match = markdown.match(end_tag);
            if (match){
                markdown = markdown.substring(match[0].length);
                match[0].replace(end_tag, parse_end_tag);
                chars = false;
            }
        }

        //start tag
        else if (markdown.indexOf("[") == 0){
            match = markdown.match(start_tag);
            if (match){
                markdown = markdown.substring(match[0].length);
                match[0].replace(start_tag, parse_start_tag);
                chars = false;
            }
        }

        if (chars) {
            index = markdown.indexOf("[");
            
            var text = index < 0 ? markdown : markdown.substring( 0, index );
            markdown = index < 0 ? "" : markdown.substring( index );
            
            if (stack.last() == "list"){
                var elements = text.split(";");
                text = elements.join("</li><li>");
            }
            else if (stack.last() == "img"){
                text += "'/>";
            }
            result += text;
        }
    }
    result += "</div>"
    return result;
}

