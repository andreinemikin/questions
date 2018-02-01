import {Component, OnInit} from "@angular/core";
import {Question} from "../models/question";
import {ConnectionService} from "../services/connection.service";

@Component({
  selector: "app-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.css"]
})
export class QuestionsComponent implements OnInit {

  cuurrentQuestion = 0;
  questions: Question[] = [];
  total: number;
  completed = false;

  constructor(private connectionService: ConnectionService) {
  }

  ngOnInit() {
    this.connectionService.getQuestions().subscribe((questions: Question[]) => {
      this.questions = questions;
    });
  }

  onSelect(currAnswer, answers) {
    answers.forEach((answer) => {
      return answer.checked = currAnswer == answer.answer? true: false;
    })
  }

  onPrev() {
    this.completed = false;
    this.cuurrentQuestion--;
  }

  onNext() {
    this.cuurrentQuestion++;
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
