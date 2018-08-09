

// Define UI variables
var form        = document.querySelector( '#task-form' );
var taskList    = document.querySelector( '.collection' );
var clearBtn    = document.querySelector( '.clear-tasks' );
var filter      = document.querySelector( '#filter' );
var taskInput   = document.querySelector( '#task' );

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    // Add task event
    form.addEventListener( 'submit', addTask );
    // Remove task event
    taskList.addEventListener( 'click', removeTask );
    // Clear task event
    clearBtn.addEventListener( 'click', clearTasks );
    // Filter tasks event
    filter.addEventListener( 'keyup', filterTasks );
}

function addTask( e ) {
    // Prevent default behavior
    e.preventDefault();

    if( taskInput.value === '' ) {
        alert( 'Add a Task' );
    }

    // Create li element
    var li = document.createElement( 'li' );
    // Add a class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild( document.createTextNode( taskInput.value ) );
    // Create new link element
    var link = document.createElement( 'a' );
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild( link );

    // Append li to ul
    taskList.appendChild( li );

    // Clear input
    taskInput.value = '';
}

// Remove Task
function removeTask( e ) {

    // Make sure it is an anchor elem by checking for a class
    if( e.target.parentElement.classList.contains( 'delete-item' ) ) {
        
        if( confirm( 'Are you sure?' ) ) {
            
            // Remove the li
            e.target.parentElement.parentElement.remove();
        }
    }
}

// Clear Tasks
function clearTasks( e ) {

    // taskList.innerHTML = '';

    // Faster
    // https://jsperf.com/innerhtml-vs-removechild
    while( taskList.firstChild ) {
        taskList.removeChild( taskList.firstChild );
    }
}

// Filter Tasks
function filterTasks( e ) {
    var text = e.target.value.toLowerCase();

    document.querySelectorAll( '.collection-item' ).forEach( function( task ) {
        var item = task.firstChild.textContent;
        if( item.toLowerCase().indexOf( text ) != -1 ) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}