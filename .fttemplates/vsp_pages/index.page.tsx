
import { use<FTName | capitalize> } from './_hooks';
import './<FTName | camelcase>.scss';

export function Page() {
    use<FTName | capitalize>.init();

    return (
        <div className="<FTName | kebabcase>">
        </div>
    );
}
