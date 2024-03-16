import EventRepository from '@repositories/eventRepository';

import { Event } from '@/interfaces/event';
import { STATUS_CODE } from '@/utils';
import BaseResponse from '@/utils/baseResponse';

class EventService {
  private repository: EventRepository;

  constructor() {
    this.repository = new EventRepository();
  }

  async createEvent(data: Event) {
    try {
      const { key } = data;
      if (!key) {
        return new BaseResponse(STATUS_CODE.BAD_REQUEST, false, 'Key is required');
      }
      const existedEvent = await this.repository.getByEntity({ key });
      if (existedEvent) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, 'Event already exists');
      }
      data.thumbnail = {
        connect: {
          id: data.thumbnail,
        },
      };
      const event = await this.repository.add(data);
      return new BaseResponse(STATUS_CODE.OK, true, 'Event created successfully', event);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async getAllEvents() {
    try {
      const events = await this.repository.getAll();
      return new BaseResponse(STATUS_CODE.OK, true, 'Get all events successfully', events);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async getEventByKey(key: string) {
    try {
      const event = await this.repository.getByEntity({ key });
      if (!event) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Event not found');
      }
      return new BaseResponse(STATUS_CODE.OK, true, 'Event found', event);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async updateEvent(data: Event, id?: number) {
    try {
      const event = await this.repository.getByEntity({ id, key: data.key });
      if (!event) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Event not found');
      }
      const updatedEvent = await this.repository.update(event.id, data);
      return new BaseResponse(STATUS_CODE.OK, true, 'Event updated successfully', updatedEvent);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async deleteEvent(id: number) {
    try {
      const event = await this.repository.getByEntity({ id });
      if (!event) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Event not found');
      }
      const deletedEvent = await this.repository.delete(id);
      return new BaseResponse(STATUS_CODE.OK, true, 'Event deleted successfully', deletedEvent);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
}

const eventService = new EventService();
export default eventService;
