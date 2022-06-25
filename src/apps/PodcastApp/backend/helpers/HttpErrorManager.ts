import { InvalidException } from "../../../../context/PodcastApp/Shared/domain/exceptions/Invalid.exception";
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

    if (error instanceof InvalidException)
      errorData = {
        status: 400,
        message: error.message,
      };

    if (error instanceof NullException)
      errorData = {
        status: 400,
        message: error.message,
      };

    this.logError(error);

    return errorData;
  }

  private logError(error: any): void {
    console.error(error);
  }
}

interface HttpErrorManagerResponse {
  status: number;
  message: string;
}
