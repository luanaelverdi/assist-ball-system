import { notificationRepository } from "../database/repository/notificationRepository";

const fetch = require('node-fetch');

const getAll = async (query: {
    search: string | null
}) => {
    const notifications = await notificationRepository.getAll();

    const results = notifications.filter(notification => {
        return (!query.search || notification.description.toLowerCase().includes(query.search.toLowerCase()));
    });

    return results;
};

export const getByID = async (id: number) => {
    const notifications = await notificationRepository.getByID(id);
    return notifications;
};

export const add = async (body: {
    description: string
}) => {
    const notification = await notificationRepository.addNotification(body);
    return notification;
};

export const modify = async (id: number, body: {
    description: string
}) => {
    const notification = await notificationRepository.modifyNotification(id, body);
    return notification;
};

export const notificationService = {
    getAll,
    getByID,
    add,
    modify
};