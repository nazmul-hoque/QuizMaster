import { Component, OnInit } from '@angular/core';
import { QuizAnswerProvider } from 'src/app/shared/provider/quiz-answer';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit {
  private Count=0;
  constructor(private quizProvider: QuizAnswerProvider) { 
    this.Count=quizProvider.Result.filter(item => item.AnswerStatus === true).length;
  }
  
  ngOnInit() {
  }

}
