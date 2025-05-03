import { FiltersType } from "../../types/utils/FiltersType";
import pool from "../db_pool/pool";

const createTask = async (title: string, description: string, status: string, priority: string, deadline: Date, user_id: number) => {

    try {
        const result = await pool.query('INSERT INTO tasks (title, description, status, priority, deadline, user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [
            title,
            description,
            status,
            priority,
            deadline,
            user_id
        ]);

        return result.rows[0]
    } catch (error) {
        return null
    }
}




const getTasks = async (user_id: number, limit: number, offset: any) => {
    try {

        let query = `SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at ASC LIMIT ${limit} OFFSET ${offset}`;

        let values: number[] = [user_id]; 

        const result = await pool.query(query, values)

        return result.rows
    } catch (error) {
        return null
    }
}

const queryTasks = async (user_id: number, filters: FiltersType, limit: number, offset: any) => {
    try {
        let query = 'SELECT * FROM tasks WHERE user_id = $1 ';

        let values: (string | number)[] = [user_id];

        let paramIndex = 2;

        if (filters.status) {
            query += `AND status = $${paramIndex} `;
            values.push(filters.status)
            paramIndex++
        }

        if (filters.priority) {
            query += `AND priority = $${paramIndex} `;
            values.push(filters.priority)
            paramIndex++
        }

        query += ` ORDER BY created_at ASC LIMIT ${limit} OFFSET ${offset}`

        const result = await pool.query(query, values)

        return result.rows

    } catch (error) {
        throw error
    }
}

const getTaskById = async (user_id: number, task_id: number) => {
    try {
        const query = 'SELECT * FROM tasks WHERE user_id = $1 and task_id = $2';
        const values: Number[] = [user_id, task_id];

        const result = await pool.query(query, values);

        return result.rows[0]
    } catch (error) {
        throw error
    }
}

const updateTask = async (title: string, description: string, status: string, priority: string, deadline: Date, user_id: number, task_id: number) => {
    try {
        const query = 'UPDATE tasks SET title = COALESCE($1, title), description = COALESCE($2, description), status = COALESCE($3, status), priority = COALESCE($4, priority), deadline = COALESCE($5, deadline) WHERE user_id = $6 and task_id = $7 RETURNING *';
        const values = [title, description, status, priority, deadline, user_id, task_id];

        const result = await pool.query(query, values);

        return result.rows[0]
    } catch (error) {
        throw error
    }
}

const deleteTask = async (task_id: number) => {
    try {
        const query = 'DELETE FROM tasks WHERE task_id = $1 RETURNING *';
        const value = [task_id];

        const result = await pool.query(query, value);

        return result.rows
    } catch (error) {
        throw error
    }
}

export = {
    createTask,
    getTasks,
    queryTasks,
    getTaskById,
    updateTask,
    deleteTask
}
