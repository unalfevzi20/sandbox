import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class EventBusService {

  private eventStream = new Subject<any>();

  publish(event: any) {
    this.eventStream.next(event);
  }

  ofEvent<T>(eventType: new (...args: any[]) => T) {
    return this.eventStream.asObservable()
      .pipe(
        filter(event => event instanceof eventType)
      );
  }
}