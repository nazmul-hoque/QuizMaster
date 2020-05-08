import { Component, OnInit } from '@angular/core';
import { QuizQuestion } from 'src/app/shared/model/question';
import { QuizAnswer } from 'src/app/shared/model/quizanswer';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizAnswerProvider } from 'src/app/shared/provider/quiz-answer';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  private questions: QuizQuestion[];
  private currentPosition = 0;
  private arrayLength = 1;
  private quizAnswer: QuizAnswer[];
  private showResult = false;
  private selectedAnswer: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private quizProvider: QuizAnswerProvider) {
    this.quizAnswer = [];
    this.questions = [
      {
        QuestionId: 1,
        Question: '1. Which is the largest country in the world by population?',
        Option: ['India', 'USA', 'China', 'Russia'],
        Answer: 'China'
      },
      {
        QuestionId: 2,
        Question: '2. When did the second world war end?',
        Option: ['1945', '1939', '1944', '1942'],
        Answer: '1945'
      },
      {
        QuestionId: 3,
        Question: '3. Which was the first country to issue paper currency?',
        Option: ['USA', 'France', 'Italy', 'China'],
        Answer: 'China'
      },
      {
        QuestionId: 4,
        Question: '4. Which city hosted the 1996 Summer Olympics?',
        Option: ['Atlanta', 'Sydney', 'Athens', 'Beijing'],
        Answer: 'Atlanta'
      },
      {
        QuestionId: 5,
        Question: '5. Who invented telephone?',
        Option: ['Albert Einstein', 'Alexander Graham Bell', 'Isaac Newton', 'Marie Curie'],
        Answer: 'Alexander Graham Bell'
      }
    ];
    this.arrayLength = this.questions.length;
  }

  ngOnInit() {
  }

  showPrevious() {
    if (this.currentPosition > 0) {
      this.currentPosition = this.currentPosition - 1;
    }
  }

  showNext() {
    if (this.currentPosition < this.arrayLength - 1) {
      this.currentPosition = this.currentPosition + 1;
    }
  }

  selectAnswer(event: any) {
    if (event.srcElement.value !== undefined) {
      this.selectedAnswer = event.srcElement.value;
    }
  }

  goToNextQuestion() {
    if (this.selectedAnswer !== undefined) {
      this.showResult = false;
      const filterdArray = this.quizAnswer.filter((element) => element.QuestionId === this.questions[this.currentPosition].QuestionId);
      if (filterdArray === undefined || filterdArray.length === 0) {
        this.quizAnswer.push({
          QuestionId: this.questions[this.currentPosition].QuestionId,
          Question: this.questions[this.currentPosition].Question,
          CorrectAnswer: this.questions[this.currentPosition].Answer,
          Answer: this.selectedAnswer,
          AnswerStatus: this.selectedAnswer === this.questions[this.currentPosition].Answer
        });
      }
      if (this.currentPosition === this.arrayLength - 1) {
        this.quizProvider.QCount=this.questions;
        this.quizProvider.Result = this.quizAnswer;
        this.router.navigate(['../quizresult'], { relativeTo: this.activatedRoute });
      }
      if (this.currentPosition < this.arrayLength - 1) {
        this.currentPosition = this.currentPosition + 1;
        this.selectedAnswer = undefined;
      }
    } else {
      this.showResult = true;
    }
  }
}
