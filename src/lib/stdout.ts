export default class stdout {
    name = "stdout"
    version = "0.0.1"

    public log(input: any) {
        console.log(input)
    }
    public returnData(_: null) {
        return '"hi"'
    }
}