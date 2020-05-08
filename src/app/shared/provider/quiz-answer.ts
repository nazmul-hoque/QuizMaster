import { Injectable } from '@angular/core';
import { QuizAnswer } from '../model/quizanswer';
import { QuizQuestion } from '../model/question';

@Injectable()
export class QuizAnswerProvider {

    public Result: QuizAnswer[];
    public QCount: QuizQuestion[];
    public constructor() { }

}
