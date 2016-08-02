#!/usr/bin/env python
# coding: utf-8
import os.path
import json
import copy
from bottle import route, run, template, request, abort, post, debug


@route('/')
def index():
    name = 'World'
    return template('<b>Hello {{name}}</b>!', name=name)


all_quiz_list = [
    {
        'q': u'夏日在烈日下工作或运动量过大出汗多时，预防中暑应多喝？',
        'options': {
            'A': u'盐开水',
            'B': u'白开水',
        },
        'a': 'A',
    },
    {
        'q': 'quest two',
        'options': {
            'A': 'op1',
            'B': 'op2',
            'C': 'op3',
        },
        'a': 'C',
    },
]

@post('/quiz')
def try_one_quiz():
    if request.json is None:
        return abort(400, 'Bad Request')
    # request object
    # {
    #    'answer': {
    #        'quiz_sequence': 1,
    #        'selected': 'A'
    #    },
    #    'new_quiz': True
    #}
    req_data = request.json
    has_next_quiz = req_data.get('new_quiz', True)
    next_quiz_sequence = 0
    status = 'next'
    if 'answer' in req_data:
        i = req_data['answer']['quiz_sequence']
        s = req_data['answer']['selected']
        if all_quiz_list[i]['a'] == s:
            next_quiz_sequence = min(i + 1, len(all_quiz_list)-1)
            if i == next_quiz_sequence:
                status = 'done'
        else:
            status = 'wrong'
    resp_data = {}
    if status == 'wrong':
        resp_data['status'] = 'fail'
        resp_data['msg'] = 'wrong'
    elif status == 'next':
        resp_data['status'] = 'ok'
        quiz = copy.copy(all_quiz_list[next_quiz_sequence])
        quiz['sequence'] = next_quiz_sequence
        del quiz['a']
        resp_data['quiz'] = quiz
    else:
        resp_data['status'] = 'ok'
        resp_data['msg'] = 'completed'
    return resp_data


debug(True)
run(host='127.0.0.1', port=8081)

