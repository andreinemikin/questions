import {Component, OnInit} from "@angular/core";
import {Question} from "../models/question";
import {ConnectionService} from "../services/connection.service";

@Component({
  selector: "app-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.css"]
})
export class QuestionsComponent implements OnInit {

  currentQuestionIndex = 0;
  lastQuestion = 0;
  questions: Question[] = [];
  total: number;
  completed = false;

  constructor(private connectionService: ConnectionService) {
  }

  ngOnInit() {
    this.connectionService.getQuestions().subscribe((questions: Question[]) => {
      this.questions = questions;
      this.lastQuestion = this.questions.length - 1;
    });
  }

  onSelect(currAnswer, answers) {
    answers.forEach((answer) => {
      answer.checked = currAnswer === answer.answer;
    })
  }

  onPrev() {
    this.currentQuestionIndex--;
  }

  onNext() {
    this.currentQuestionIndex++;
  }

  showScore() {
    this.total = 0;
    this.completed = true;
    this.questions.forEach((question) => {
      question.answers.forEach((answer) => {
        this.total += answer.checked? answer.score: 0;
      });
    });
  }

}
