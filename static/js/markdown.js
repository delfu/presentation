function parse_markdown(markdown, options){
    var start_tag = /^\[((list|title|img|left|right|top|bottom|center|middle))\]/;
    var end_tag = /^\[\/((list|title|img|left|right|top|bottom|center|middle))\]/;

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
        else if (tag_name == "left"){
            result += "<div style='position:absolute;left:3%;right:50%;top:3%;bottom:3%;'>";
        }
        else if (tag_name == "right"){
            result += "<div style='position:absolute;left:50%;right:3%;top:3%;bottom:3%;'>";
        }
        else if (tag_name == "top"){
            result += "<div style='position:absolute;left:3%;right:3%;top:3%;bottom:50%;'>";
        }
        else if (tag_name == "bottom"){
            result += "<div style='position:absolute;left:3%;right:3%;top:50%;bottom:3%;'>";
        }
        else if (tag_name == "center" || tag_name == "title"){
            result += "<div style='margin:10px auto;text-align:center'>";
            if (tag_name == "title"){
                result += "<h2>"
            }
        }
        else if (tag_name == "middle"){
            result += "<div style='width:100%;height: 100%;display:table;'><div style='display:table-cell;vertical-align:middle;'>";
        }
    }

    function parse_end_tag(tag, tag_name){
        if (tag_name == "list"){
            result += "</li></ul>";
        }
        else if (tag_name == "img"){
            result += "'/>";
        }
        else if (tag_name == "left" || tag_name == "right" || tag_name == "top" || tag_name == "bottom"){
            result += "</div>";
        }
        else if (tag_name == "center" || tag_name == "title"){
            if (tag_name == "title"){
                result += "</h2>";
            }
            result += "</div>";
        }
        else if (tag_name == "middle"){
            result += "</div></div>";
        }
        stack.pop();
    }


    result = "<div class='" + type + " " + id + "'>"
    var prev_markdown = "";
    while ( markdown ) {
        prev_markdown = markdown;
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
            else{ //prevent infinite loop
                result += markdown[0];
                markdown = markdown.substring(1);
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
            result += text;
        }
        if (prev_markdown == markdown){
            break;
        }
    }
    result += "</div>"
    return result;
}

