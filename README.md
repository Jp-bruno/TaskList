Objetivo: criar um task manager

O que falta:

1. criar botao para excluir tarefa - FEITO

2. criar botao para editar titulo da tarefa - FEITO
    2.1 - Lembrar de retornar ao titulo antigo caso a operaçao de mudança de titulo de tarefa queira ser cancelada -- FEITO

3. criar funçao para editar descrição da tarefa - FEITO
    3.1 criar botao para salvar alterações feitas na descrição - FEITO

4. criar botao para marcar tarefa como concluída - FEITO

5. criar a função que adiciona a tarefa à lista de concluidas - FEITO

6. adicionar detalhes de data da criação da tarefa (dia/mes/ano - hora:minuto) - FEITO

7. salvar as tarefas no localstorage do navegador - A FAZER

8. criar botao para exibir apenas tarefas concluídas - A FAZER


English

Objective: create a basic task manager

    This project was built with ReactJS. 
    
    I used react context API to storage the list items and pass the list methods.

    The user should be able to:

    - Create tasks with:
        - Title
        - Description
        - Creation date and time
        - Conclusion date and time
    - Click the "Complete Task" to mark a task as complete
    - Click the pencil icon to edit a task title
    - Click the X icon to delete a task (complete or not)
    - Click the "Save" button to save changes in the task description
    - Edit a non-complete task description