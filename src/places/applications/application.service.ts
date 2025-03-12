import { HttpStatus, Injectable } from '@nestjs/common';
import { PlacesRepository } from '../domain/places.repository';
import { PlaceDTO } from '../infrastructure/dtos/dtos';
import { IResponse } from '../../shared/domain/IResponse';
import { Place } from '../domain/place';
import { validate } from 'uuid';
import { Ticket } from '../../tickets/domain/ticket';
import { TicketsRepository } from '../../tickets/domain/tickets.repository';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly _repository: PlacesRepository,
    private readonly _ticketsRepository: TicketsRepository,
  ) {}

  public async createPlace(dto: PlaceDTO, user: string): Promise<IResponse> {
    const place = Place.parseDTO(dto);
    place.user_creator = user;
    try {
      const isCreated = await this._repository.createPlace(place);
      if (isCreated) {
        return new IResponse(
          false,
          true,
          'Place created successfully',
          HttpStatus.CREATED,
          'Place',
        );
      }

      return new IResponse(
        true,
        false,
        'An error occurred while creating the place',
        HttpStatus.ACCEPTED,
        'Place',
      );
    } catch (e) {
      return new IResponse(
        true,
        false,
        'An error occurred while creating the place, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Place',
      );
    }
  }

  public async updatePlace(dto: PlaceDTO): Promise<IResponse> {
    const place = Place.parseDTO(dto);
    try {
      const isUpdated = await this._repository.updatePlace(place);
      if (!isUpdated) {
        return new IResponse(
          true,
          null,
          'An error occurred while updating the place',
          HttpStatus.ACCEPTED,
          'Place',
        );
      }

      return new IResponse(
        false,
        place,
        'Place updated successfully',
        HttpStatus.OK,
        'Place',
      );
    } catch (e) {
      return new IResponse(
        true,
        null,
        'An error occurred while updating the place, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Place',
      );
    }
  }

  public async deletePlace(id: string, user: string): Promise<IResponse> {
    try {
      if (!validate(id)) {
        return new IResponse(
          true,
          false,
          'Invalid user id',
          HttpStatus.BAD_REQUEST,
          'User',
        );
      }

      const isDeleted = await this._repository.deletePlace(id, user);
      if (!isDeleted) {
        return new IResponse(
          true,
          false,
          'An error occurred while deleting the place',
          HttpStatus.ACCEPTED,
          'Place',
        );
      }

      return new IResponse(
        false,
        true,
        'Place deleted successfully',
        HttpStatus.OK,
        'Place',
      );
    } catch (e) {
      return new IResponse(
        true,
        false,
        'An error occurred while deleting the place, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Place',
      );
    }
  }

  public async getPlaceById(id: string): Promise<IResponse> {
    try {
      if (!validate(id)) {
        return new IResponse(
          true,
          null,
          'Invalid place id',
          HttpStatus.BAD_REQUEST,
          'Place',
        );
      }

      const place = await this._repository.getPlaceById(id);
      if (!place) {
        return new IResponse(
          true,
          null,
          'Place not found',
          HttpStatus.NOT_FOUND,
          'Place',
        );
      }

      return new IResponse(false, place, 'Place found', HttpStatus.OK, 'Place');
    } catch (e) {
      return new IResponse(
        true,
        null,
        'An error occurred while getting the place, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Place',
      );
    }
  }

  public async getPlaces(): Promise<IResponse> {
    try {
      const places = await this._repository.getPlaces();
      return new IResponse(
        false,
        places,
        'Places found',
        HttpStatus.OK,
        'Place',
      );
    } catch (e) {
      return new IResponse(
        true,
        null,
        'An error occurred while getting the places, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Place',
      );
    }
  }

  public async getTicketsPlace(place: string): Promise<IResponse<Ticket[]>> {
    try {
      const tickets = await this._ticketsRepository.getTicketsByPlace(place);
      return new IResponse(
        false,
        tickets,
        'Tickets retrieved successfully',
        HttpStatus.OK,
        'Ticket',
      );
    } catch (e) {
      return new IResponse(
        true,
        null,
        'An error occurred while retrieving the tickets, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Ticket',
      );
    }
  }
}
