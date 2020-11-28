export class Contours {
    public contours: number[][] = [[]];

    public totalPoints(): number {
        return this.contours.reduce((acc, next) => acc + next.length, 0);
    }
}
