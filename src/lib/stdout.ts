export default class stdout {
    name = "stdout"
    version = "0.0.1"

    public log(input: any) {
        process.stdout.write(input)
    }
}