const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Rota para obter todas as tarefas
router.get('/', async (req, res) => {
    try {
        const task = await Task.find();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rota GET para obter tarefas filtrando pelo status "Pendente"
router.get('/pending', async (req, res) => {
    try {
        const pendingTasks = await Task.find({ status: 'Pendente' });

        if (pendingTasks.length > 0) {
            res.json(pendingTasks);
        } else {
            res.json({ message: 'Nenhuma tarefa pendente encontrada.' });
        }
    } catch (error) {
        console.error('Erro ao buscar tarefas pendentes:', error);
        res.status(500).json({ error: 'Erro ao processar a solicitação.' });
    }
});

// Rota GET para obter tarefas filtrando pelo status "Em andamento"
router.get('/in-progress', async (req, res) => {
    try {
        const inProgressTasks = await Task.find({ status: 'Em andamento' });

        if (inProgressTasks.length > 0) {
            res.json(inProgressTasks);
        } else {
            res.json({ message: 'Nenhuma tarefa em andamento encontrada.' });
        }
    } catch (error) {
        console.error('Erro ao buscar tarefas em andamento:', error);
        res.status(500).json({ error: 'Erro ao processar a solicitação.' });
    }
});

// Rota GET para obter tarefas filtrando pelo status "Concluído"
router.get('/completed', async (req, res) => {
    try {
        const completedTasks = await Task.find({ status: 'Concluído' });

        if (completedTasks.length > 0) {
            res.json(completedTasks);
        } else {
            res.json({ message: 'Nenhuma tarefa concluída encontrada.' });
        }
    } catch (error) {
        console.error('Erro ao buscar tarefas concluídas:', error);
        res.status(500).json({ error: 'Erro ao processar a solicitação.' });
    }
});

// Rota para obter uma tarefa por ID
router.get('/:id', getTask, (req, res) => {
    res.json(res.task);
});

// Rota para criar uma tarefa
router.post('/', async (req, res) => {
    const task = new Task({
        name: req.body.name,
        date: req.body.date,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status,
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rota para atualizar uma tarefa por ID
router.put('/:id', getTask, async (req, res) => {
    if (req.body.name != null) {
        res.task.name = req.body.name;
    }
    if (req.body.date != null) {
        res.task.date = req.body.date;
    }
    if (req.body.description != null) {
        res.task.description = req.body.description;
    }
    if (req.body.priority != null) {
        res.task.priority = req.body.priority;
    }
    if (req.body.status != null) {
        res.task.status = req.body.status;
    }

    try {
        const updatedTask = await res.task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rota para excluir uma tarefa por ID
router.delete('/:id', getTask, async (req, res) => {
    try {
        await res.task.deleteOne();
        res.json({ message: 'Tarefa excluída com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Função para obter uma tarefa por ID
async function getTask(req, res, next) {
    try {
        const task = await Task.findById(req.params.id);
        if (task == null) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        res.task = task;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = router;