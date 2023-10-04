import { PositionsEnum } from "../@types/PositionsEnum";

export const PositionsMap = new Map<string, string>([
    [PositionsEnum.FRONTEND_DEVELOPER, 'frontend - разработчик'],
    [PositionsEnum.BACKEND_DEVELOPER, 'backend - разработчик'],
    [PositionsEnum.QA_ENGINEER, 'тестировщик'],
    [PositionsEnum.UI_UX_DESIGNER, 'ui/ux дизайнер'],
    [PositionsEnum.DATABASE_DEVELOPER, 'администратор баз данных'],
    [PositionsEnum.ANALYST, 'аналитик']
])