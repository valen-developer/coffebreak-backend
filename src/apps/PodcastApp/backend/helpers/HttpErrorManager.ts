import { InvalidFormatException } from "../../../../context/PodcastApp/Shared/domain/exceptions/InvalidFormat.exception";
import { NotFoundException } from "../../../../context/PodcastApp/Shared/domain/exceptions/NotFound.exception";
import { NullException } from "../../../../context/PodcastApp/Shared/domain/exceptions/Null.exception";

export class HttpErrorManager {
  public manage(error: any): HttpErrorManagerResponse {
    let errorData: HttpErrorManagerResponse = {
      status: 500,
      message: "Internal Server Error",
    };

    if (error instanceof NotFoundException)
      errorData = {
        status: 404,
        message: error.message,
      };

    if (error instanceof InvalidFormatException)
      errorData = {
        status: 400,
        message: error.message,
      };

    if (error instanceof NullException)
      errorData = {
        status: 400,
        message: error.message,
      };

    this.logMessage(error.message);

    return errorData;
  }

  private logMessage(message: string): void {
    console.error(message);
  }
}

interface HttpErrorManagerResponse {
  status: number;
  message: string;
}
