import { notificationRepository } from "../database/repository/notificationRepository";

const fetch = require('node-fetch');

const getAll = async () => {
    const notifications = await notificationRepository.getAll();
    return notifications;
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