document.addEventListener('DOMContentLoaded', function(){
    const todoList = document.getElementById('todoList');
    const inputTodo = document.getElementById('inputTodo');
    const btnAdd = document.getElementById('btnAdd');

    // 로컬 스토리지에서 할 일 불러오기
    loadTodos();

    // 등록 (추가 버튼 클릭)
    btnAdd.addEventListener('click', function() {
        const todoValue = inputTodo.value.trim(); // 공백 제거

        if (todoValue === '') { // 빈 입력 방지
            alert('할 일을 입력하세요!');
            return;
        }

        addTodo(todoValue); // 할 일 추가 함수 실행
        saveTodos(); // 로컬 스토리지 업데이트
        inputTodo.value = ''; // 입력창 초기화
        inputTodo.focus(); // 입력창 포커스 유지
    });

    // 할 일 추가 함수
    function addTodo(todoText) {
        const listItem = document.createElement('li');
        listItem.className = 'd-flex list-group-item align-items-center justify-content-between';

        const span = document.createElement('span');
        span.innerText = todoText;

        // 수정 버튼
        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-warning btn-sm me-2';
        editBtn.innerText = '수정';
        editBtn.onclick = function() {
            const newText = prompt('수정할 내용을 입력하세요:', span.innerText);
            if (newText !== null && newText.trim() !== '') {
                span.innerText = newText.trim();
                saveTodos(); // 수정 후 저장
            }
        };

        // 삭제 버튼
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm';
        deleteBtn.innerText = '삭제';
        deleteBtn.onclick = function() {
            todoList.removeChild(listItem);
            saveTodos(); // 삭제 후 저장
        };

        // 요소 조립
        listItem.appendChild(span);
        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);
        todoList.appendChild(listItem);
    }

    // 로컬 스토리지에 할 일 저장
    function saveTodos() {
        const todos = [];
        document.querySelectorAll('#todoList li span').forEach(item => {
            todos.push(item.innerText);
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // 로컬 스토리지에서 할 일 불러오기
    function loadTodos() {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            JSON.parse(savedTodos).forEach(todo => addTodo(todo));
        }
    }
});
