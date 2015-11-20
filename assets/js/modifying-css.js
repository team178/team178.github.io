/* 
 * StyleSheet - OO Interface
 *
 * version: 1.01 (10/08/09)
 * @author Nick Giles www.4pmp.com
 * @Licence GPL
 * @requires jQuery v1.2.6 or later
 */

    /**
     * Compiles a stylesheet object and attaches the resultant CSS to the HTML head tag
     *
     * @param StyleSheet
     */
    function addInlineStyleSheet(styleSheet)
    {
        // See if STYLE tag already exists
        if ($("style#inlinestyle").length == 0)
        {
            // Doesn't exist, so create it
            var styleElement = document.createElement('style');
            $(styleElement).attr('type', "text/css");
            $(styleElement).attr('id', "inlinestyle");
            
            $('head').append(styleElement);
        }
        
        // Update LINK tag contents
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) 
        {
        
            // IE
            var rules = styleSheet.compileToRules();
            
            for (var i = rules.length-1; i>=0; i--)
            {
                document.styleSheets.inlinestyle.addRule(rules[i].tag, rules[i].css);
            }
        }
        else
        {
            $("style#inlinestyle").text(styleSheet.compile());
        }
    
    }

    /**
     * Sorts a numerically indexed associative array in ascending order
     * (This isn't attached to the Array object for good reasons)
     *
     * @type Array
     * @return Sorted array
     */
    function ksort(source)
    {
        var keys = new Array();
        
        for (var key in source)
        {
            keys.push(key);
        }
        
        keys.sort( function (a, b){return (a - b);} );
        
        var noKeys = keys.length;
        var result = new Array();
        
        for (var i=0; i<noKeys; i++)
        {
            result.push(source[keys[i]]);
        }
        
        return result;
    }


    /* --- Class definitons --- */

    /**
     * Stylesheet element class
     *  - every property/value pair is represented by this class
     *
     * @constructor
     */
    function StyleSheetElement(property, value)
    {
        this.property = property;
        this.value = value;
    }

    /**
     * Stylesheet tag class
     *  - elements that apply to a CSS selector are encapsulated by a tag object
     *
     * @constructor
     */
    function StyleSheetTag(name)
    {
        this.name = name;
        this.order = 9999;
        this.elements = new Array();
        
        /**
         * Adds an element to the tag
         *
         * @param StyleSheetElement
         */
        this.addElement = function(newElement)
        {
            var done=0;
        
            for (var i=this.elements.length-1; i>= 0; i--)
            {
                if (this.elements[i].property == newElement.property)
                {
                    // Replace
                    this.elements[i].value = newElement.value;
                    
                    done = 1;
                    break;
                }
            }
            
            if (done == 0)
            {
                // Add
                this.elements.push(newElement);
            }
        }
    }

    /**
     * Stylesheet class
     *  - encapsulates tag objects and creates CSS from them
     *
     * @constructor
     */
    function StyleSheet()
    {
        this.tags = new Array();
        
        /**
         * Adds an element to a tag, if the tag doesn't exist then it is created
         *
         * @param StyleSheetTag
         * @param StyleSheetElement
         * @type StyleSheetTag
         * @return Returns the tag object that the element was added to
         */
        this.addElementToTag = function(tagName, newElement)
        {
            var done=0;
            
            // Loop through tags
            for (var i=this.tags.length-1; i>= 0; i--)
            {
                if (this.tags[i].name == tagName)
                {
                    // Update
                    var tag = this.tags[i];
                    tag.addElement(newElement);
                    
                    done = 1;
                    break;
                }
            }
            
            if (done == 0)
            {
                tag = new StyleSheetTag(tagName);
                tag.addElement(newElement);
                this.tags.push(tag); 
            }
            
            return tag;
        }
        
        /**
         * Compiles all the attached tags to create CSS
         *
         * @return CSS
         */
        this.compile = function()
        {
            var css = "";
            
            tags = this.orderedTags();
        
            // Loop through tags
            for (var i in tags)
            {
                // Start CSS tag
                css += tags[i].name + " {";
            
                // For each tag, loop through elements
                for (var j=tags[i].elements.length-1; j>=0; j--)
                {
                    css += tags[i].elements[j].property + ": " + tags[i].elements[j].value + ";";
                }
                
                css += "}\n";
            }
            
            return css;
        }

        this.compileToRules = function()
        {
            var rules = new Array();
            
            tags = this.orderedTags();
        
            // Loop through tags
            for (var i in tags)
            {
                // Start CSS tag
                var tag = tags[i].name;
                var css = "";
            
                // For each tag, loop through elements
                for (var j=tags[i].elements.length-1; j>=0; j--)
                {
                    css += tags[i].elements[j].property + ": " + tags[i].elements[j].value + "; ";
                }
                
                var rule = new Object();
                rule.tag = tag;
                rule.css = css;
                
                rules.push(rule);
            }
            
            return rules;
        }


        /**
         * Orders the attached tags and returns them as an array
         *
         * @type Array
         * @return Array of tags
         */
        this.orderedTags = function()
        {
            var orderedTags = new Array();
        
            var noTags = this.tags.length;
            
            for (var i=0; i < noTags ; i++)
            {
                var order = this.tags[i].order;
                
                do
                {
                    if (orderedTags.hasOwnProperty(order))
                    {
                        // This index exists so increment order and loop again
                        order++;
                    }
                    else
                    {
                        orderedTags[order] = this.tags[i];
                        
                        break;
                    }
                }
                while (1)
            }
            
            return ksort(orderedTags);
        }
    }
