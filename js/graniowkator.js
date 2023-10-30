// Copyright (C) Radost Waszkiewicz 2022
window.onload=function(){
    document.my_constants = new Map();
    document.my_constants["user_guess"] = "";    
    document.getElementById('ready').onclick = reset_board;        


    document.getElementById('board_container').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            console.log('Enter');
            event.preventDefault(); // disallow enters - they break the svg
        }
        if(event.key === 'Delete' || event.key === 'Backspace')
        {
            console.log('Delete');

            if(getSelection().anchorNode.nodeType != Node.TEXT_NODE)
            {
                event.preventDefault();                
            }

            if(getSelection().type == "Range")
            {
                event.preventDefault();
                if(getSelection().anchorNode.tagName == "text")
                {
                    getSelection().anchorNode.textContent = "???";
                    getSelection().anchorNode.blur();
                }                
            }
            
        }
    });
}

function removeDiacritics(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[\u0142\u0141]/g, 'l'); // "ł" and "Ł" -> l
}

function clean_compare(str_1, str_2) {
    // Remove whitespace and convert to lowercase
    const clean_str_1 = removeDiacritics(str_1).replace(/\s/g, '').toLowerCase();
    const clean_str_2 = removeDiacritics(str_2).replace(/\s/g, '').toLowerCase();
  
    return clean_str_1 === clean_str_2;
}

function hide_answers()
{
    board = document.getElementById('board_container')
    texts = board.querySelectorAll('text');
    texts.forEach(text => {
        if(!text.data)
        {
            text.data = text.textContent; // Save svg caption to data field
            console.log(text.textContent); // Debug
        }        
        text.textContent = "???";
        text.classList = ""

        text.addEventListener('click', function() {
            const selection = window.getSelection();
            const range = document.createRange();
        
            range.selectNodeContents(this);
            selection.removeAllRanges();
            selection.addRange(range);
        });
    

    });
}

function check_answers()
{
    board = document.getElementById('board_container')
    texts = board.querySelectorAll('text');
    
    texts.forEach(text => {
        target = text.data;
        current = text.textContent;

        if(current == "")
        {
            text.textContent = "???";
            text.blur();
        }

        if(clean_compare(target,current))
        {
            text.classList.add('solved');
        }
        else
        {
            if(current != "???")
            {
                console.log([target,current]);
            }
        }
    });     
}

function reset_board()
{    
    document.my_constants["start_time"] = Date.now();

    hide_answers()
    document.getElementById('board_container').contentEditable = true;
    document.getElementById('board_container').oninput = check_answers;
    
}