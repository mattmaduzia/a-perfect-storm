/**
 * Helpers related to the environment (production, test, etc.)
 */
export default class EnvironmentHelper {
  /**
   * Whether the current environment is development or test
   */
  public static isDevOrTest(): boolean {
    return ["development", "test"].includes(process.env.NODE_ENV);
  }

  /**
   * Logs message to console if environment is not production
   * @param message
   * @param args
   */
  public static logIfNotProd(message: string, ...args: any[]): void {
    if (this.isDevOrTest()) {
      console.error(message, ...args);
    }
  }
}
