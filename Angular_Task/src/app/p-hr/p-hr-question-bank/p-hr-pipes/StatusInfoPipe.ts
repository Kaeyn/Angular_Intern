import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'statusInfo'
})

export class StatusInfoPipe implements PipeTransform{
    transform(value: number){
        const statusInfoMap : { [key: number]: { name: string, color: string } } = {
            0: {name: 'Đang soạn thảo', color: '#26282E' },
            1: {name: 'Gửi duyệt', color: '#31ADFF' },
            2: {name: 'Đã duyệt', color: '#008000' },
            3: {name: 'Ngưng áp dụng', color: '#FB311C' },
            4: {name: 'Trả về', color: '#B7B92F' },
        }
        return statusInfoMap[value];
    }
}