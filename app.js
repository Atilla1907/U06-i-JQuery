const API_URL = "https://u05restfulapi.onrender.com/api/v1/todos";

console.log("jQuery körs");

// jQuery ready function
$(document).ready(function() {
  
  // Cache jQuery selectors
  const $form = $("#todo-form");
  const $todoList = $("#todo-list");
  const $titleInput = $("#todo-title");
  const $descInput = $("#todo-description");
  const $dueDateInput = $("#todo-dueDate");
  const $completedInput = $("#todo-completed");
  const $filterButtons = $(".filters button");

  // Fetch todos with optional filter
  function fetchTodos(filter) {
    let url = API_URL;
    if (filter === "true" || filter === "false") {
      url += `/filter?completed=${filter}`;
    }
    
    $.ajax({
      url: url,
      method: "GET",
      dataType: "json"
    })
    .done(function(data) {
      $todoList.empty();
      
      $.each(data, function(index, todo) {
        const $li = $("<li>");
        
        // Create checkbox
        const $checkbox = $("<input>", {
          type: "checkbox",
          checked: todo.completed
        });
        
        $checkbox.on("change", function() {
          $.ajax({
            url: `${API_URL}/${todo._id}`,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify({ completed: $checkbox.is(":checked") })
          })
          .done(function() {
            fetchTodos(filter);
          })
          .fail(function(err) {
            console.error(err);
          });
        });
        
        // Create text div
        const $textDiv = $("<div>");
        const $titleSpan = $("<strong>").text(todo.title);
        const $descSpan = $("<span>").text(todo.description ? ` - ${todo.description}` : "");
        $textDiv.append($titleSpan).append($descSpan);
        
        if (todo.dueDate) {
          const $dateSpan = $("<span>").text(` (Deadline: ${new Date(todo.dueDate).toLocaleDateString()})`);
          $textDiv.append($dateSpan);
        }
        
        // Create edit button
        const $editBtn = $("<button>", {
          text: "Ändra",
          class: "edit"
        });
        
        $editBtn.on("click", function() {
          editTodo(todo);
        });
        
        // Create delete button
        const $delBtn = $("<button>", {
          text: "Ta bort"
        });
        
        $delBtn.on("click", function() {
          deleteTodo(todo._id);
        });
        
        // Append all elements to list item
        $li.append($checkbox).append($textDiv).append($editBtn).append($delBtn);
        $todoList.append($li);
      });
    })
    .fail(function(err) {
      console.error(err);
    });
  }

  // Form submit handler
  $form.on("submit", function(e) {
    e.preventDefault();
    
    const newTodo = {
      title: $titleInput.val().trim(),
      description: $descInput.val().trim(),
      dueDate: $dueDateInput.val() || null,
      completed: $completedInput.is(":checked")
    };
    
    if (!newTodo.title) return;
    
    $.ajax({
      url: API_URL,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(newTodo)
    })
    .done(function() {
      $form[0].reset();
      fetchTodos();
    })
    .fail(function(err) {
      console.error(err);
    });
  });

  // Delete todo function
  function deleteTodo(id) {
    $.ajax({
      url: `${API_URL}/${id}`,
      method: "DELETE"
    })
    .done(function() {
      fetchTodos();
    })
    .fail(function(err) {
      console.error(err);
    });
  }

  // Edit todo function
  function editTodo(todo) {
    const newTitle = prompt("Titel:", todo.title) || todo.title;
    const newDesc = prompt("Beskrivning:", todo.description || "") || todo.description;
    const newDue = prompt("Deadline (YYYY-MM-DD):", todo.dueDate ? todo.dueDate.split("T")[0] : "") || todo.dueDate;
    
    $.ajax({
      url: `${API_URL}/${todo._id}`,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify({
        title: newTitle,
        description: newDesc,
        dueDate: newDue,
        completed: todo.completed
      })
    })
    .done(function() {
      fetchTodos();
    })
    .fail(function(err) {
      console.error(err);
    });
  }

  // Filter button handlers
  $filterButtons.each(function() {
    $(this).on("click", function() {
      fetchTodos($(this).data("filter"));
    });
  });

  // Initial fetch
  fetchTodos("all");
  
});
